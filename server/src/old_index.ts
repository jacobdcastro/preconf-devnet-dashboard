import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import Redis from "ioredis";
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

const getCurrentSlot = async () => {
  const genesisRes = await axios.get(
    BEACON_API_BASE_URL + "/eth/v1/beacon/genesis"
  );
  const genesisTimeSeconds = parseInt(genesisRes.data.data.genesis_time);
  const currentTimeSeconds = Math.floor(Date.now() / 1000);

  return Math.floor((currentTimeSeconds - genesisTimeSeconds) / 12);
};

const handleSlotChange = async (currentSlot: number) => {
  if (currentSlot !== lastSlot) {
    const previousSlot = currentSlot - 1;
    const prevConfirmedKey = `${previousSlot}_confirmed`;
    const prevConfirmedEvent = await redis.get(prevConfirmedKey);

    if (!prevConfirmedEvent) {
      const prevKeys = await redis.keys(`${previousSlot}_*`);
      for (const key of prevKeys) {
        const event = await redis.get(key);
        if (event) {
          const parsedEvent = JSON.parse(event);
          const newKey = `${currentSlot}_${parsedEvent.tx_hash}`;
          parsedEvent.slot = currentSlot;
          await redis.set(
            newKey,
            JSON.stringify(parsedEvent),
            "EX",
            EXPIRE_TIME
          );
          await redis.del(key);
        }
      }
    }
    lastSlot = currentSlot;
  }
};

app.post("/events/preconfs/requested", async (req: Request, res: Response) => {
  const event: PreconfRequestedEvent = {
    ...req.body,
    requested: true,
    preconfirmed: false,
    included: null,
  };

  const currentSlot = await getCurrentSlot();
  event.slot = currentSlot;

  await handleSlotChange(currentSlot);

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
});

app.post("/events/preconfs/responded", async (req: Request, res: Response) => {
  const event: PreconfRespondedEvent = {
    ...req.body,
    requested: true,
    preconfirmed: true,
    included: null,
  };

  const currentSlot = await getCurrentSlot();
  event.slot = currentSlot;

  await handleSlotChange(currentSlot);

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
});

app.post("/events/preconfs/confirmed", async (req: Request, res: Response) => {
  const event: PreconfConfirmedEvent = req.body;

  const currentSlot = await getCurrentSlot();
  event.slot = currentSlot;

  const { slot, tx_hashes } = event;

  const key = `${slot}_confirmed`;
  await redis.set(key, JSON.stringify(event), "EX", EXPIRE_TIME);

  for (const tx_hash of tx_hashes) {
    const txKey = `${slot}_${tx_hash}`;
    const existingEvent = await redis.get(txKey);
    if (existingEvent) {
      const parsedEvent = JSON.parse(existingEvent);
      parsedEvent.included = true;
      await redis.set(txKey, JSON.stringify(parsedEvent), "EX", EXPIRE_TIME);
    }
  }

  try {
    const keys = await redis.keys(`${slot}_*`);
    for (const key of keys) {
      if (key === `${slot}_confirmed`) continue; // Skip the confirmed event key
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
});

app.get("/data", async (req: Request, res: Response) => {
  let data: any = {
    currentTimestampSeconds: Math.floor(Date.now() / 1000),
    preconfTxns: [],
    confirmedBlock: null,
  };

  try {
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

    data.slot = {
      genesisTimeSeconds,
      currentEpoch,
      currentSlot,
      slotIndex: currentSlot % 32,
      currentEpochProposers: proposerRes.data.data,
    };

    await handleSlotChange(currentSlot);

    try {
      const keys = await redis.keys(`${currentSlot}_*`);

      const preconfTxns = [];

      for (const key of keys) {
        if (key === `${currentSlot}_confirmed`) continue; // Skip the confirmed event key
        const event = await redis.get(key);
        if (event) preconfTxns.push(JSON.parse(event));
      }

      preconfTxns.sort((a, b) => a.timestamp - b.timestamp);

      data.preconfTxns = preconfTxns;

      const keyConfirmed = `${currentSlot}_confirmed`;
      const confirmedEvent = await redis.get(keyConfirmed);
      if (confirmedEvent) data.confirmedBlock = JSON.parse(confirmedEvent);
    } catch (error) {
      console.error("Error querying Redis:", error);
    }
  } catch (error) {
    console.error("Error during data processing:", error);
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
