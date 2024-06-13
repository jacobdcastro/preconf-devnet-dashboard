import axios from "axios";

const EVENTS_ENDPOINT = "http://localhost:8080/events";
const BEACON_API_BASE_URL = "http://18.199.195.154:32995";
const SLOT_DURATION = 12000; // 12 seconds
const TXN_PER_SLOT = 5;

const getCurrentSlot = async () => {
  const genesisRes = await axios.get(
    BEACON_API_BASE_URL + "/eth/v1/beacon/genesis"
  );
  const genesisTimeSeconds = parseInt(genesisRes.data.data.genesis_time);
  const currentTimeSeconds = Math.floor(Date.now() / 1000);

  return Math.floor((currentTimeSeconds - genesisTimeSeconds) / 12);
};

const sendEvent = async (eventType, eventData) => {
  try {
    await axios.post(`${EVENTS_ENDPOINT}/preconfs/${eventType}`, eventData);
    console.log(`Sent ${eventType} for tx_hash: ${eventData.tx_hash}`);
  } catch (error) {
    console.error(
      `Error sending ${eventType} for tx_hash: ${eventData.tx_hash}`,
      error.message
    );
  }
};

const spamTransactions = async (slot) => {
  const delayBetweenTxns = SLOT_DURATION / TXN_PER_SLOT;

  for (let i = 0; i < TXN_PER_SLOT; i++) {
    const tx_hash = `0x_${slot}_${i}`;
    const timestamp = Date.now();
    const randomDelay = Math.random() * delayBetweenTxns;

    const requestData = {
      protocol_id: "protocol1",
      tx_hash: tx_hash,
      timestamp: timestamp,
      slot: slot,
      validator_index: 0,
      endpoint: `${EVENTS_ENDPOINT}/preconfs/requested`,
    };

    const responseData = {
      protocol_id: "protocol1",
      tx_hash: tx_hash,
      timestamp: timestamp + randomDelay + 100, // 100-200ms delay
      slot: slot,
      validator_index: 0,
      endpoint: `${EVENTS_ENDPOINT}/preconfs/responded`,
    };

    setTimeout(async () => {
      await sendEvent("requested", requestData);
      setTimeout(() => sendEvent("responded", responseData), randomDelay);
    }, randomDelay * i);
  }
};

const sendBlockConfirmed = async (slot) => {
  const tx_hashes = Array.from(
    { length: TXN_PER_SLOT },
    (_, i) => `0x_${slot}_${i}`
  );
  const eventData = {
    protocol_id: "protocol1",
    timestamp: Date.now(),
    slot: slot,
    block_number: slot,
    block_hash: `0x_block_${slot}`,
    graffiti: "test",
    validator_index: 0,
    endpoint: `${EVENTS_ENDPOINT}/preconfs/confirmed`,
    tx_hashes: tx_hashes,
  };

  await sendEvent("confirmed", eventData);
};

const startSpamming = async () => {
  let slot = await getCurrentSlot();
  setInterval(async () => {
    slot = await getCurrentSlot(); // Ensure we get the current slot each interval
    await spamTransactions(slot);
    setTimeout(() => sendBlockConfirmed(slot), SLOT_DURATION - 1000); // Send block_confirmed 500ms before the end of the slot
  }, SLOT_DURATION);
};

startSpamming();
