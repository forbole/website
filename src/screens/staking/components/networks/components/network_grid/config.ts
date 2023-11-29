export type ParamsProps = {
  bonded: number;
  APY: number;
  TVL: number;
};

export type NetworkProps = {
  [graphqlKey: string]: ParamsProps;
};

// state data

const defaultParams: ParamsProps = {
  bonded: 0,
  APY: 0,
  TVL: 0,
};

export const cosmosNetworkParams: NetworkProps = [
  "agoric",
  "akash",
  "archway",
  "assetmantle",
  "axelar",
  "band",
  "bitsong",
  "celer",
  "cheqd",
  "comdex",
  "coreum",
  "cosmos",
  "crescent",
  "cro",
  "emoney",
  "ethereum",
  "evmos",
  "fetchai",
  "gitopia",
  "gravitybridge",
  "humansai",
  "injective",
  "jackal",
  "kava",
  "kyve",
  "likecoin",
  "mars",
  "neutron",
  "nolus",
  "nomic",
  "nym",
  "omniflix",
  "osmosis",
  "passage",
  "persistence",
  "picasso",
  "provenance",
  "quicksilver",
  "regen",
  "sentinelhub",
  "ssv",
  "stafihub",
  "stargaze",
  "stride",
  "sui",
  "teritori",
  "tgrade",
  "ununifi",
  "vsys",
  "wormhole",
  "xpla",
].reduce((acc, key) => ({ ...acc, [key]: defaultParams }), {});

export const elrondNetworkParams: NetworkProps = {
  elrond: defaultParams,
};

export const solanaNetworkParams: NetworkProps = {
  solana: defaultParams,
};

export const oasisNetworkParams: NetworkProps = {
  oasis: defaultParams,
};

export const radixNetworkParams: NetworkProps = {
  radix: defaultParams,
};

export const suiNetworkParams: NetworkProps = {
  sui: defaultParams,
};
