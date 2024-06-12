interface PreconfStream {
  // streamed array of preconf objects
  preconfs: {
    id: string; // preconf id
    timestamp: number; // timestamp received (by either relay or )
    address: string; // address who submitted the preconf
    tipAmount: number; // tip amount
    gateway: any; // the gateway preconf was submitted to
    relay: any; // the relay preconf was submitted to

    data?: any; // [optional]: any other important data you think might be useful
  }[];
}

interface BlockBuildStream {
  // streamed array of block objects
  blocks: {
    timestamp: number; // timestamp built/proposed
    slot: number; // slot number for block
    proposer: string; // proposer public key
    validatorIndex: number; // validator index
    gateway: any; // gateway that proposed the block
    relay: any; // relay that proposed the block

    data?: any; // [optional]: any other important data you think might be useful
  }[];
}

interface ProposedBlockSummary {
  // data about proposed block
  timestamp: number; // timestamp built/proposed
  slot: number; // slot number for block
  proposer: string; // proposer public key
  validatorIndex: number; // validator index
  relay?: any; // relay that proposed the block
  preconfsIncludedInBlock: {
    id: string; // preconf id
  }[];
}

export interface IRelayerInfo {
  name: string | undefined;
  img: any;
}

export interface IGatewayInfo {
  name: string | undefined;
}

export interface ISlot {
  proposerPubKey?: string;
  validatorIndex?: number;
  relayer?: IRelayerInfo;
  gateway?: IGatewayInfo;
  slotNumber?: number;
  slotStatus?: string;
  logs?: {
    content?: string;
    status?: string;
  }[];
}

export interface IEpoch {
  slots?: ISlot[];
  startTime?: number;
  index?: number;
}
