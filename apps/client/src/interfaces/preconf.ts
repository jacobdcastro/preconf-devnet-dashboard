
export interface IRelayerInfo {
    name: string | undefined;
    img: any;
}

export interface IProposer {
    name?: string;
    pubkey: string;
}
export interface IGatewayInfo {
    name: string | undefined; 
}

export interface ISlot {
    currentProposerPubkey?: string;
    validatorIndex?: number;
    relayer?: IRelayerInfo; 
    gateway?: IGatewayInfo;
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


export const RelayerNames: {[x: string]: string} = {
    titan: "Titan",
    ultrasound: "Ultrasound",
    limechain: "Limechain",
    chainbound: "Chainbound"
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


export const Gateway: {[x: string]: string} = {
}

export const Relayers: IRelayerInfo[] = [
    {
        name: RelayerNames.titan, 
        img: '/logos/titan.jpg'
    },
    {
        name: RelayerNames.ultrasound, 
        img: '/logos/ultrasound.png'
    },
    {
        name: RelayerNames.limechain, 
        img: '/logos/limechain.png'
    },
    {
        name: RelayerNames.chainbound, 
        img: '/logos/chainbound.jpg'
    },
]