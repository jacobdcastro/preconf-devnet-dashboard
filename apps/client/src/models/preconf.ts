export interface RelayerInfo {
    name: string | undefined;
    logoPath: string;
}

export interface GatewayInfo {
    name: string | undefined; 
}

export interface Preconf {
    proposerPubKey?: string;
    relayer?: RelayerInfo; 
    gateway?: GatewayInfo;
    slotNumber?: number;
}