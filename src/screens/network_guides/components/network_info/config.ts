const infoItems = [
  {
    title: "staked by forbole",
    stats: "-",
    type: "money",
  },
  {
    title: "apy",
    stats: 0,
    type: "percentage",
  },
  {
    title: "commission",
    stats: 0,
    type: "percentage",
  },
  {
    title: "unbonding period",
    stats: "-",
    type: "string",
  },
];

type ParamsProps = {
  title: string;
  stats: number | string;
  type: string;
};

type NetworkGuideProps = {
  [graphqlKey: string]: ParamsProps[];
};

// state data

export const cosmosNetworkGuideParams: NetworkGuideProps = {
  cosmos: infoItems,
  emoney: infoItems,
  akash: infoItems,
  agoric: infoItems,
  assetmantle: infoItems,
  axelar: infoItems,
  bitcanna: infoItems,
  bitsong: infoItems,
  cheqd: infoItems,
  chihuahua: infoItems,
  comdex: infoItems,
  crescent: infoItems,
  ixo: infoItems,
  kava: infoItems,
  likecoin: infoItems,
  osmosis: infoItems,
  persistence: infoItems,
  secret: infoItems,
  sentinelhub: infoItems,
  nomic: infoItems,
  gravitybridge: infoItems,
  cro: infoItems,
  evmos: infoItems,
  juno: infoItems,
  sommelier: infoItems,
  stargaze: infoItems,
  stride: infoItems,
  teritori: infoItems,
};
