import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import Redis from "ioredis";
import { WebSocketServer, WebSocket } from "ws";
dotenv.config();

const BEACON_API_BASE_URL = "http://18.199.195.154:32995";
const ULTRASOUND_RELAY_BASE_URL =
  "http://0xa836f6db5a879f12a7502a3c57c74d1bd83e30b05be4fcfbb14f75433b97ca1399e325179efb15facf6c17eb20030bc6@3.124.156.98:8081";
const REDIS_BASE_URL = process.env.REDIS_URL || "redis://redis:6379";
const EXPIRE_TIME = 14 * 60; // 14 minutes in seconds

const PORT = process.env.PORT || 8080;

// Create a Redis client
const redis = new Redis(REDIS_BASE_URL);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error: ", err);
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Preconfirmation Devnet Dashboard Server!");
});

interface PreconfRequestedEvent {
  protocol_id: string;
  tx_hash: string;
  timestamp: number;
  slot: number;
  validator_index: number;
  endpoint: string;
  requested?: boolean;
  preconfirmed?: boolean;
  included?: boolean | null;
}

interface PreconfRespondedEvent {
  protocol_id: string;
  tx_hash: string;
  timestamp: number;
  slot: number;
  validator_index: number;
  endpoint: string;
  requested?: boolean;
  preconfirmed?: boolean;
  included?: boolean | null;
}

interface PreconfConfirmedEvent {
  protocol_id: string;
  timestamp: number;
  slot: number;
  block_number: number;
  block_hash: string;
  graffiti: string;
  validator_index: number;
  endpoint: string;
  tx_hashes: string[];
}

let lastSlot = 0;

const handleSlotChange = async (currentSlot: number) => {
  if (currentSlot !== lastSlot) {
    lastSlot = currentSlot;
  }
};

const updateEventInArray = (
  array: PreconfRequestedEvent[],
  event: PreconfRequestedEvent
) => {
  const index = array.findIndex((e) => e.tx_hash === event.tx_hash);
  if (index !== -1) {
    array[index] = event;
  } else {
    array.push(event);
  }
};

app.get("/epoch", async (req: Request, res: Response) => {
  const genesisRes = await axios.get(
    BEACON_API_BASE_URL + "/eth/v1/beacon/genesis"
  );
  const genesisTimeSeconds = parseInt(genesisRes.data.data.genesis_time);
  const currentTimeSeconds = Math.floor(Date.now() / 1000);

  const currentSlot = Math.floor(
    (currentTimeSeconds - genesisTimeSeconds) / 12
  );
  const currentEpoch = Math.floor(currentSlot / 32);

  const proposerRes = await axios.get(
    BEACON_API_BASE_URL + "/eth/v1/validator/duties/proposer/" + currentEpoch
  );

  res.json({
    genesisTimeSeconds,
    currentEpoch,
    currentSlot,
    slotIndex: currentSlot % 32,
    currentEpochProposers: proposerRes.data.data,
  });
});

app.post("/events/preconfs/requested", async (req: Request, res: Response) => {
  const event: PreconfRequestedEvent = {
    ...req.body,
    requested: true,
    preconfirmed: false,
    included: null,
  };

  await handleSlotChange(event.slot);

  const { slot, tx_hash } = event;
  const key = `${slot}_${tx_hash}`;

  const existingEvent = await redis.get(key);
  if (existingEvent) {
    const parsedEvent = JSON.parse(existingEvent);
    Object.assign(parsedEvent, event);
    await redis.set(key, JSON.stringify(parsedEvent), "EX", EXPIRE_TIME);
  } else {
    await redis.set(key, JSON.stringify(event), "EX", EXPIRE_TIME);
  }

  res.status(200).send("Event received.");
  notifyClients(); // Notify WebSocket clients
});

app.post("/events/preconfs/responded", async (req: Request, res: Response) => {
  const event: PreconfRespondedEvent = {
    ...req.body,
    requested: true,
    preconfirmed: true,
    included: null,
  };

  await handleSlotChange(event.slot);

  const { slot, tx_hash } = event;
  const key = `${slot}_${tx_hash}`;

  const existingEvent = await redis.get(key);
  if (existingEvent) {
    const parsedEvent = JSON.parse(existingEvent);
    Object.assign(parsedEvent, event);
    await redis.set(key, JSON.stringify(parsedEvent), "EX", EXPIRE_TIME);
  } else {
    await redis.set(key, JSON.stringify(event), "EX", EXPIRE_TIME);
  }

  res.status(200).send("Event received.");
  notifyClients(); // Notify WebSocket clients
});

app.post("/events/preconfs/confirmed", async (req: Request, res: Response) => {
  const event: PreconfConfirmedEvent = req.body;

  const { slot, tx_hashes } = event;

  await handleSlotChange(slot);

  const key = `${slot}_confirmed`;
  await redis.set(key, JSON.stringify(event), "EX", EXPIRE_TIME);

  for (const tx_hash of tx_hashes) {
    const txKey = `${slot}_${tx_hash}`;
    const existingEvent = await redis.get(txKey);
    if (existingEvent) {
      const parsedEvent = JSON.parse(existingEvent);
      parsedEvent.included = true; // Ensure 'included' is set to true for all txns
      await redis.set(txKey, JSON.stringify(parsedEvent), "EX", EXPIRE_TIME);
    }
  }

  try {
    const keys = await redis.keys(`${slot}_*`);
    for (const key of keys) {
      if (key === `${slot}_confirmed`) continue; // Skip the confirmed event key
      if (!key.startsWith(`${slot}_`)) continue; // Ensure keys are filtered by the current slot
      const existingEvent = await redis.get(key);
      if (existingEvent) {
        const parsedEvent = JSON.parse(existingEvent);
        if (parsedEvent.included === null) {
          parsedEvent.included = false;
        }
        parsedEvent.preconfirmed = true;
        await redis.set(key, JSON.stringify(parsedEvent), "EX", EXPIRE_TIME);
      }
    }
  } catch (error) {
    console.error("Error updating preconfirmed status:", error);
  }

  res.status(200).send("Event received.");
  notifyClients(); // Notify WebSocket clients
});

// WebSocket server setup
const server = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

let clients: WebSocket[] = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

const notifyClients = async () => {
  let data: any = {
    currentTimestampSeconds: Math.floor(Date.now() / 1000),
  };

  try {
    const currentSlot = lastSlot; // Use the lastSlot as the current slot

    await handleSlotChange(currentSlot);

    const currentSlotPreconfTxns: PreconfRequestedEvent[] = [];
    const prevSlotPreconfTxns: PreconfRequestedEvent[] = [];
    let prevSlotConfirmedBlock: PreconfConfirmedEvent | null = null;

    try {
      const currentKeys = await redis.keys(`${currentSlot}_*`);
      for (const key of currentKeys) {
        if (key === `${currentSlot}_confirmed`) continue;
        if (!key.startsWith(`${currentSlot}_`)) continue;
        const event = await redis.get(key);
        if (event) currentSlotPreconfTxns.push(JSON.parse(event));
      }

      currentSlotPreconfTxns.sort((a, b) => b.timestamp - a.timestamp);

      const prevKeys = await redis.keys(`${currentSlot - 1}_*`);
      for (const key of prevKeys) {
        if (key === `${currentSlot - 1}_confirmed`) continue;
        if (!key.startsWith(`${currentSlot - 1}_`)) continue;
        const event = await redis.get(key);
        if (event) prevSlotPreconfTxns.push(JSON.parse(event));
      }

      prevSlotPreconfTxns.sort((a, b) => b.timestamp - a.timestamp);

      const prevConfirmedEvent = await redis.get(
        `${currentSlot - 1}_confirmed`
      );
      if (prevConfirmedEvent) {
        prevSlotConfirmedBlock = JSON.parse(prevConfirmedEvent);
      }
    } catch (error) {
      console.error("Error querying Redis:", error);
    }

    const epochRes = await axios.get(
      BEACON_API_BASE_URL + "/eth/v1/beacon/genesis"
    );
    const genesisTimeSeconds = parseInt(epochRes.data.data.genesis_time);
    const currentTimeSeconds = Math.floor(Date.now() / 1000);

    const currentSlotCalculated = Math.floor(
      (currentTimeSeconds - genesisTimeSeconds) / 12
    );
    const currentEpoch = Math.floor(currentSlotCalculated / 32);
    const slotIndex = currentSlotCalculated % 32;

    const proposerRes = await axios.get(
      BEACON_API_BASE_URL + "/eth/v1/validator/duties/proposer/" + currentEpoch
    );

    data.currentSlotPreconfTxns = currentSlotPreconfTxns;
    data.prevSlotPreconfTxns = prevSlotPreconfTxns;
    data.prevSlotConfirmedBlock = prevSlotConfirmedBlock;
    data.slot = {
      genesisTimeSeconds,
      currentEpoch,
      currentSlot: currentSlotCalculated,
      slotIndex,
      currentEpochProposers: proposerRes.data.data,
    };
  } catch (error) {
    console.error("Error during data processing:", error);
  }

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
};
