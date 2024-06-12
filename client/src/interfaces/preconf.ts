
export interface IBuilder {
    name: string | undefined;
    img: any;
}
export interface IPreconf {
    name: string | undefined;
    img: any;
}

export interface IProposer {
    name?: string;
    pubkey: string;
}
export interface ISlot {
    currentProposerPubkey?: string;
    validatorIndex?: number;
    builder?: IBuilder; 
    preconf?: IPreconf;
    slotIndex?: number | undefined;
    currentEpoch: number | null;
    currentEpochProposers: Object[];
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


export const PreconfNames: {[x: string]: string} = {
    bolt: "Bolt",
    primev: "Primev",
    delegatedPreconf: "delegatedPreconf"
}

export const BuilderNames: {[x: string]: string} = {
    titan: "Titan",
    ultrasound: "Ultrasound",
}

export const proposerNames = [
    {
        name: 'alice',
        pubkey: '0x23',
    },
    {
        name: 'bob',
        pubkey: '0x9999',
    },
];


export const Preconfs: IPreconf[] = [
    { 
        name: PreconfNames.bolt, 
        img: '/logos/bolt.png'
    },
    { 
        name: PreconfNames.primev, 
        img: '/logos/primev.png'
    },
    { 
        name: PreconfNames.delegatedPreconf, 
        img: '/logos/delegated.png'
    },
]

export const Builders: IBuilder[] = [
    {
        name: BuilderNames.titan, 
        img: '/logos/titan.jpg'
    },
    {
        name: BuilderNames.ultrasound, 
        img: '/logos/ultrasound.png'
    },
]

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