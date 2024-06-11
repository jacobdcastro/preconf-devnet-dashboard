import axios from "axios";

export async function GET() {
  try {
    const genRes = await axios.get(
      process.env.BEACON_API_BASE_URL + "/eth/v1/beacon/genesis"
    );
    const genesisTime = parseInt(genRes.data.data.genesis_time);
    const currentTime = Math.floor(Date.now() / 1000);

    const currentEpoch = Math.floor((currentTime - genesisTime) / 12 / 32);

    const proposerRes = await axios.get(
      process.env.BEACON_API_BASE_URL +
        "/eth/v1/validator/duties/proposer/" +
        currentEpoch
    );

    return Response.json({
      currentEpoch,
      proposerRes: proposerRes.data.data,
    });
  } catch (error) {
    return Response.json({
      error,
    });
  }
}
