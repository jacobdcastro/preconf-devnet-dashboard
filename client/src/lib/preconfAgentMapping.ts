export interface Proposer {
  name: string | undefined;
  validatorIndices?: number[];
  img?: string;
  builders?: NonProposer[];
  relays?: NonProposer[];
}

export interface IProposer {
  name?: string;
  pubkey: string;
}

export interface NonProposer {
  name: string | undefined;
  img?: string;
}

export const PreconfNames: { [x: string]: string } = {
  bolt: "Bolt",
  primev: "Primev",
  delegatedPreconf: "delegatedPreconf",
};

export const BuilderNames: { [x: string]: string } = {
  titan: "Titan",
  ultrasound: "Ultrasound",
  bolt: "Bolt",
};

const boltValidatorIndices = Array.from({ length: 64 }, (_, index) => index);
const titanValidatorIndices = Array.from(
  { length: 245 - 192 + 1 },
  (_, index) => 192 + index
);

export const proposers: Proposer[] = [
  {
    name: "Bolt",
    validatorIndices: boltValidatorIndices,
    img: "/logos/bolt.png",
    builders: [
      {
        name: BuilderNames.bolt,
        img: "/logos/bolt.png",
      },
    ],
    relays: [
      {
        name: BuilderNames.bolt,
        img: "/logos/bolt.png",
      },
    ],
  },
  {
    name: "Titan",
    validatorIndices: titanValidatorIndices,
    img: "/logos/titan.jpg",
    builders: [
      {
        name: BuilderNames.titan,
        img: "/logos/titan.jpg",
      },
    ],
    relays: [
      {
        name: BuilderNames.ultrasound,
        img: "/logos/ultrasound.png",
      },
      {
        name: BuilderNames.titan,
        img: "/logos/titan.jpg",
      },
    ],
  },
  {
    name: "Chorus One",
    validatorIndices: [247, 250, 251, 252, 254],
    img: "/logos/chorus.jpg",
  },
  {
    name: "Kiln",
    validatorIndices: [246, 248, 249, 253, 255],
    img: "/logos/kiln.jpeg",
  },
];

export const Preconfs: NonProposer[] = [
  {
    name: PreconfNames.primev,
    img: "/logos/primev.png",
  },
  {
    name: PreconfNames.delegatedPreconf,
    img: "/logos/delegated.png",
  },
];

export const findProposerNameByValidatorIndex = (
  arr: Proposer[],
  key: number | string
): string | null => {
  return proposers.find((p) =>
    p.validatorIndices.includes(parseInt(key?.toString()))
  ).name;
};

export const findProposerByValidatorIndex = (
  arr: Proposer[],
  key: number | string
): Proposer => {
  return proposers.find((p) =>
    p.validatorIndices.includes(parseInt(key?.toString()))
  );
};
