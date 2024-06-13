
export interface IBuilder {
    name: string | undefined;
    img: any;
}
export interface IPreconf {
    name: string | undefined;
    validatorIndices?: number[];
    img?: string;
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

const boltValidatorIndices = Array.from({ length: 64 }, (_, index) => index);
const titanValidatorIndices = Array.from({ length: 245 - 192 + 1 }, (_, index) => 192 + index)

export const proposerNames: IPreconf[] = [
    {
        name: 'Bolt',
        validatorIndices: boltValidatorIndices,
        img: '/logos/bolt.svg'
    },
    {
        name: 'Titan',
        validatorIndices: titanValidatorIndices,
        img: '/logos/titan.jpg'

    },
    {
        name: 'Chorus One',
        validatorIndices: [247, 250, 251, 252, 254],
        img: '/logos/chorus.jpg'
    },
    {
        name: 'Kiln',
        validatorIndices: [246, 248, 249, 253, 255],
        img: '/logos/kiln.jpeg'
    },
];


export const Preconfs: IPreconf[] = [

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
