import { RelayerInfo } from "../interfaces"

export const RelayerNames: {[x: string]: string} = {
    titan: "TITAN",
    ultrasound: "ULTRASOUND",
    limechain: "LIMECHAIN",
    chainbound: "CHAINBOUND"
}

export const Gateway: {[x: string]: string} = {
}

export const Relayers: RelayerInfo[] = [
    {
        name: RelayerNames.titan, 
        logoPath: '/logos/titan.avif'
    },
    {
        name: RelayerNames.ultrasound, 
        logoPath: '/logos/ultrasound.png'
    },
    {
        name: RelayerNames.limechain, 
        logoPath: '/logos/limechain.png'
    },
    {
        name: RelayerNames.chainbound, 
        logoPath: '/logos/chainbound.jpg'
    },
]