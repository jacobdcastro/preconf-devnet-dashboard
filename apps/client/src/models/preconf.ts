
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


export const RelayerNames: {[x: string]: string} = {
    titan: "Titan",
    ultrasound: "Ultrasound",
    limechain: "Limechain",
    chainbound: "Chainbound"
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