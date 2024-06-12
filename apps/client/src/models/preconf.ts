export interface IRelayerInfo {
    name: string | undefined;
    logoPath: string;
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