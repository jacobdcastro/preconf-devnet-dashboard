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

app.get("/redis/set", async (req: Request, res: Response) => {
  await redis.set("test", "Hello, Redis!");
  res.send("Set value in Redis");
});

app.get("/redis/get", async (req: Request, res: Response) => {
  const value = await redis.get("test");
  res.send(value);
});

interface PreconfRequestedEvent {
  protocol_id: string; // Bolt or titan
  tx_hash: string; // The transaction hash
  timestamp: number; // Timestamp in UNIX milliseconds
  slot: number; // The target slot
  validator_index: number; // The target validator index
  endpoint: string; // Preconf endpoint
}

interface PreconfRespondedEvent {
  protocol_id: string; // Bolt or titan
  tx_hash: string; // The transaction hash
  timestamp: number; // Timestamp in UNIX milliseconds
  slot: number; // The target slot
  validator_index: number; // The target validator index
  endpoint: string; // Preconf endpoint
}

interface PreconfConfirmedEvent {
  protocol_id: string; // Bolt or titan
  tx_hash: string; // The transaction hash
  timestamp: number; // Timestamp in UNIX milliseconds
  slot: number; // The target slot
  block_number: number; // Block number
  block_hash: string; // Block hash
  graffiti: string; // Graffiti
  validator_index: number; // The target validator index
  endpoint: string; // Preconf endpoint
  tx_hashes: string[]; // Array of transaction hashes
}

app.post("/events/preconfs/requested", async (req: Request, res: Response) => {
  const event = req.body;
  const { slot, tx_hash } = event;
  const key = `${slot}_requested_${tx_hash}`;
  await redis.set(key, JSON.stringify(event));
  res.status(200).send("Event saved to Redis");
});

app.post("/events/preconfs/responded", async (req: Request, res: Response) => {
  const event = req.body;
  const { slot, tx_hash } = event;
  const key = `${slot}_responded_${tx_hash}`;
  await redis.set(key, JSON.stringify(event));
  res.status(200).send("Event saved to Redis");
});

app.post("/events/preconfs/confirmed", async (req: Request, res: Response) => {
  const event = req.body;
  const { slot } = event;
  const key = `${slot}_confirmed`;
  await redis.set(key, JSON.stringify(event));
  res.status(200).send("Event saved to Redis");
});

app.get("/data", async (req: Request, res: Response) => {
  let data: any = {
    currentTimestampSeconds: Math.floor(Date.now() / 1000),
  };

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

  try {
    const constraintRes = await axios.get(
      ULTRASOUND_RELAY_BASE_URL + "/relay/v1/builder/constraints"
    );
    data.preconfs = constraintRes.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      console.log(error);
      console.log("No constraints found");
      data.preconfs = [];
    }
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
