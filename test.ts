interface EpochProposer {
  pubkey: string;
  validator_index: string;
  slot: string;
}

interface PreconfRequestedEvent {
  protocol_id: string;
  tx_hash: string;
  timestamp: number;
  slot: number;
  validator_index: number;
  endpoint: string;
}

interface PreconfRespondedEvent {
  protocol_id: string;
  tx_hash: string;
  timestamp: number;
  slot: number;
  validator_index: number;
  endpoint: string;
}

interface PreconfConfirmedEvent {
  protocol_id: string;
  tx_hash: string;
  timestamp: number;
  slot: number;
  block_number: number;
  block_hash: string;
  graffiti: string;
  validator_index: number;
  endpoint: string;
  tx_hashes: string[];
}

interface DashboardDataPayload {
  requestedEvents: PreconfRequestedEvent[];
  respondedEvents: PreconfRespondedEvent[];
  confirmedBlock: PreconfConfirmedEvent;
  genesisTimeSeconds: number;
  currentEpoch: number;
  currentSlot: number;
  slotIndex: number;
  currentEpochProposers: EpochProposer[];
}

const testDataPayload: DashboardDataPayload = {
  requestedEvents: [
    {
      protocol_id: "1234556",
      tx_hash: "0xabc123",
      timestamp: Date.now(),
      slot: 8960,
      validator_index: 98,
      endpoint: "endpoint1",
    },
    {
      protocol_id: "1234556",
      tx_hash: "0xdef456",
      timestamp: Date.now(),
      slot: 8961,
      validator_index: 160,
      endpoint: "endpoint2",
    },
    {
      protocol_id: "1234556",
      tx_hash: "0xghi789",
      timestamp: Date.now(),
      slot: 8962,
      validator_index: 198,
      endpoint: "endpoint3",
    },
  ],
  respondedEvents: [
    {
      protocol_id: "1234556",
      tx_hash: "0xjkl012",
      timestamp: Date.now(),
      slot: 8960,
      validator_index: 51,
      endpoint: "endpoint4",
    },
    {
      protocol_id: "1234556",
      tx_hash: "0xmnq345",
      timestamp: Date.now(),
      slot: 8961,
      validator_index: 153,
      endpoint: "endpoint5",
    },
    {
      protocol_id: "1234556",
      tx_hash: "0xrst678",
      timestamp: Date.now(),
      slot: 8962,
      validator_index: 195,
      endpoint: "endpoint6",
    },
  ],
  confirmedBlock: {
    protocol_id: "1234556",
    tx_hash: "0xuvw901",
    timestamp: Date.now(),
    slot: 8962,
    block_number: 123456,
    block_hash: "0xhash123",
    graffiti: "example graffiti",
    validator_index: 198,
    endpoint: "endpoint7",
    tx_hashes: ["0xhash1", "0xhash2", "0xhash3"],
  },
  genesisTimeSeconds: 1718117531,
  currentEpoch: 280,
  currentSlot: 8962,
  slotIndex: 2,
  currentEpochProposers: [
    {
      pubkey:
        "0xa9fdcd176de75a9a1ec07d553a267413ec5406ea5f46a65d924519da3fa4b3009e2bb350fed52a51bd8683fca5d6184a",
      validator_index: "98",
      slot: "8960",
    },
    {
      pubkey:
        "0x902b0898a017b3e98d334cdf49d5411e507f6043fca0624e937945c7dfb1829a3a2e1d0bdba654aef7d2e3c14c76b48d",
      validator_index: "160",
      slot: "8961",
    },
    {
      pubkey:
        "0x88cee7a3c398f11dc6eaa039542e9467bc7cfcab47718d92533d7adf7e36021e7cbee54342320837aca410b4e1dd6a33",
      validator_index: "198",
      slot: "8962",
    },
    {
      pubkey:
        "0xab64f900c770e2b99de6b86b4390bbd1579bd48dccec55800adbcf52e006f22128e9971bbf3a92cc0105b0974849935a",
      validator_index: "51",
      slot: "8963",
    },
    {
      pubkey:
        "0xadc1c39301fa1fe99678a7b7887e895c8df24e15546b13d2237ab2795cc7004e6b68e69724f2c0922f119d5af8819bc9",
      validator_index: "153",
      slot: "8964",
    },
    {
      pubkey:
        "0xa069b0ecd8be3a45dc395f87b4ea9ac575f2f39dd922a1201ff0a3b9a5ec551f64a325647e6fa58770d94af853d6d6e5",
      validator_index: "195",
      slot: "8965",
    },
    {
      pubkey:
        "0xae4dc089d92c027f4cc3141c309edb5e23f0bc0935146bf3db2592317479e7757fbc65624ef9c1ecfb54d21602079d06",
      validator_index: "252",
      slot: "8966",
    },
    {
      pubkey:
        "0xab72cbc6575c3179680a58c0ecd5de46d2678ccbafc016746348ee5688edcb21b4e15bd37c70c508e3ea73103c2d566b",
      validator_index: "14",
      slot: "8967",
    },
    {
      pubkey:
        "0x9918433b8f0bc5e126da3fdef8d7b71456492dae6d2d07f2e10c7a7f852046f84ed0ce6d3bfec42200670db27dcf3037",
      validator_index: "45",
      slot: "8968",
    },
    {
      pubkey:
        "0xb2225575d5e70da1257db7a0d1222c5041b52aac61cf161e8fc8126a3fdf5eb4f0867d98dfe272199c36cf8f02661b3d",
      validator_index: "43",
      slot: "8969",
    },
    {
      pubkey:
        "0xa90dab71ad924fec01a579727736fd9a19a147bf57ef471255527b55a4702cfd54bb0300623c506823e723e7c30cf4dd",
      validator_index: "80",
      slot: "8970",
    },
    {
      pubkey:
        "0x8548d74ab33e8dd285e72b1ea3c15eb08b66d555493bcf39aa4355af06ccf0f4469e09f110544dc04b1f3d0e7880ac1d",
      validator_index: "91",
      slot: "8971",
    },
    {
      pubkey:
        "0xa75ca9447dca3a3745ada36731187ddd1f6a152cf15d7446b785eab381e5c8562c1202a6e7a24080bc6b619a161113db",
      validator_index: "20",
      slot: "8972",
    },
    {
      pubkey:
        "0x88ce4d8fee80abef17438d6e1dee0da0087b3fde540c7cd157e169866c603af0af26fe3c3d2ba517dead10376d60df89",
      validator_index: "158",
      slot: "8973",
    },
    {
      pubkey:
        "0xb0d4372ed0f55fa767a5fefc734c155a33821ffb6e6be4f628955a6477cf1d4f12c1d0e82426a8ca14b9e92ef094472f",
      validator_index: "104",
      slot: "8974",
    },
    {
      pubkey:
        "0xa5c521377c52dfe16b14e171bf3cddfceb7a6dbd768a7ce9716447b342466ab23e5c0e77854649735c4e41dd5f981e74",
      validator_index: "214",
      slot: "8975",
    },
    {
      pubkey:
        "0xa25eef6fa1f3b3bd7abb301c28230897aaf57fad66ce0871c54241948328bf40092f343b5f092d89ffa79b462a0ad0f1",
      validator_index: "240",
      slot: "8976",
    },
    {
      pubkey:
        "0xa4bacbd1f1195b0ab5253b7437e05d235d663f9e8109dded69ef45a71a5366f337c2787679717ea06f8321cd0982c22d",
      validator_index: "209",
      slot: "8977",
    },
    {
      pubkey:
        "0xaf89ab00a0eab1131645292a9cfba583a69a1e3ac58b210e262494853e67385aeb50d4af428bdd577b9399daa96d8b20",
      validator_index: "57",
      slot: "8978",
    },
    {
      pubkey:
        "0x92b68717b3b88b77716884d492966713d902eb35196cf71faf1fb5625327ddbdebae94786c77dde207b5666ffa6dff98",
      validator_index: "75",
      slot: "8979",
    },
    {
      pubkey:
        "0xa067c96285c9e48306065cc1b0217e2de81be782fc101b7cb0a1cc1fd25f10e7bd428df87593a04babc7cdb0ceff31aa",
      validator_index: "222",
      slot: "8980",
    },
    {
      pubkey:
        "0x8a48989a82f473050e42cd9cb58d8538d285e069d775b034df1d3a703fd5821d8ae6e2bc5cc5ee3bc770cb28ba59f6bd",
      validator_index: "230",
      slot: "8981",
    },
    {
      pubkey:
        "0xa9f291de2f415ab3a4002206769493d82a094e1934b78d98b79c93f70ffff7389d8ea0962b34b6df04ba999442a0fda5",
      validator_index: "135",
      slot: "8982",
    },
    {
      pubkey:
        "0xa1d9840eda3036fbf63eeea40146e4548553e6e1b2a653ab349b376f31b367c40d71fb59ff8e94b91daa99c262ec8b52",
      validator_index: "26",
      slot: "8983",
    },
    {
      pubkey:
        "0x8fda66b8607af873f4c2c8218dd3ffc7940d411047eb199b5cd010156af4845d21dd2e65b0e44cfffb5e78271e9bb29d",
      validator_index: "60",
      slot: "8984",
    },
    {
      pubkey:
        "0xa38f647bb270cfd59a8567c5afe5e02463eafd2fc9d0379494c0b83b235594cf3283d5cf67ae6ddcca00f78bce7d78d2",
      validator_index: "232",
      slot: "8985",
    },
    {
      pubkey:
        "0xa8fa3584a92b079c8c73ed1553e5e161a0b21325fc2fc4e24a892354a899c7fc0bfb436a97a7ed1fc71bccda438ea715",
      validator_index: "44",
      slot: "8986",
    },
    {
      pubkey:
        "0xaa080afda88d384d10c98431dfec91c4072d6c9a4b43f302e5918d6292fdca1969f37a26cb05af494b6e46b3d61eb053",
      validator_index: "111",
      slot: "8987",
    },
    {
      pubkey:
        "0xa8d747a2b2602fe32095a7dda37a86d94f8a59cc771902be8c45de5bfd9d58fc1bf46fb0cf867054cd5eacf4f331dfd1",
      validator_index: "115",
      slot: "8988",
    },
    {
      pubkey:
        "0xa067c96285c9e48306065cc1b0217e2de81be782fc101b7cb0a1cc1fd25f10e7bd428df87593a04babc7cdb0ceff31aa",
      validator_index: "222",
      slot: "8989",
    },
    {
      pubkey:
        "0xae5302796cfeca685eaf37ffd5baeb32121f2f07415bee26cc0051ee513ff3932d2c365e3d9f87b0949a5980445cb64c",
      validator_index: "24",
      slot: "8990",
    },
    {
      pubkey:
        "0xb602e252aea22de9c5d5733b8ddcd2b4db8aaf24fe57f73b5584bbc9acb5f89af75717290ec7f7ea2a9fbc1ee7dd82d7",
      validator_index: "229",
      slot: "8991",
    },
  ],
};
