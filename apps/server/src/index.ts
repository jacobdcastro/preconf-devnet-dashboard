import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();

const BEACON_API_BASE_URL = process.env.BEACON_API_BASE_URL;
const ULTRASOUND_RELAY_BASE_URL = process.env.ULTRASOUND_RELAY_BASE_URL;
const PORT = process.env.PORT || 8080;

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Preconfirmation Devnet Dashboard Server!");
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
