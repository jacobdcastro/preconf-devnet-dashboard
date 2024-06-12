
export interface IRelayerInfo {
    name: string | undefined;
    img: any;
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

export const ProposerPubkeyToName: {[x: string]: string} = {
    proposer1: '0x859155dd5a22f116ae8f61b1516770f8ff41ec0ea24b8b745171b4cf34981bb7d235e7e1a739a0589e7c7ff69ede9b15',
    proposer2: '0x859155dd5a22f116ae8f61b1516770f8ff41ec0ea24b8b745171b4cf34981bb7d235e7e1a739a0589e7c7ff69ede9b15',
}

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