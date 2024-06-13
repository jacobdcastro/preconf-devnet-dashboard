interface SlotData {
  genesisTimeSeconds: number;
  currentEpoch: number;
  currentSlot: number;
  slotIndex: number;
  currentEpochProposers: {
    pubkey: string;
    slot: string;
    validator_index: string;
  }[];
}

interface PreconfTransaction {
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

interface ConfirmedBlock {
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

interface DataPayload {
  currentTimestampSeconds: number;
  slot: SlotData;
  currentSlotPreconfTxns: PreconfTransaction[];
  prevSlotPreconfTxns: PreconfTransaction[];
  prevSlotConfirmedBlock: ConfirmedBlock | null;
}

export type { SlotData, PreconfTransaction, ConfirmedBlock, DataPayload };

export const placeholderDataPayload: DataPayload = {
  currentTimestampSeconds: 0,
  slot: {
    genesisTimeSeconds: 0,
    currentEpoch: 0,
    currentSlot: 0,
    slotIndex: 0,
    currentEpochProposers: [],
  },
  currentSlotPreconfTxns: [],
  prevSlotPreconfTxns: [],
  prevSlotConfirmedBlock: null,
};
