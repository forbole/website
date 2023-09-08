export type ParamsProps = {
  bonded: number;
  APY: number;
  TVL: number;
};

export type NetworkProps = {
  [graphqlKey: string]: ParamsProps;
};

// state data

export const cosmosNetworkParams: NetworkProps = {
  cosmos: { bonded: 0, APY: 0, TVL: 0 },
  emoney: { bonded: 0, APY: 0, TVL: 0 },
  akash: { bonded: 0, APY: 0, TVL: 0 },
  agoric: { bonded: 0, APY: 0, TVL: 0 },
  bitsong: { bonded: 0, APY: 0, TVL: 0 },
  fetchai: { bonded: 0, APY: 0, TVL: 0 },
  cro: { bonded: 0, APY: 0, TVL: 0 },
  evmos: { bonded: 0, APY: 0, TVL: 0 },
  comdex: { bonded: 0, APY: 0, TVL: 0 },
  axelar: { bonded: 0, APY: 0, TVL: 0 },
  // bitcanna: { bonded: 0, APY: 0, TVL: 0 },
  cheqd: { bonded: 0, APY: 0, TVL: 0 },
  // chihuahua: { bonded: 0, APY: 0, TVL: 0 },
  // terra_classic: { bonded: 0, APY: 0, TVL: 0 },
  persistence: { bonded: 0, APY: 0, TVL: 0 },
  crescent: { bonded: 0, APY: 0, TVL: 0 },
  // ixo: { bonded: 0, APY: 0, TVL: 0 },
  injective: { bonded: 0, APY: 0, TVL: 0 },
  // juno: { bonded: 0, APY: 0, TVL: 0 },
  kava: { bonded: 0, APY: 0, TVL: 0 },
  band: { bonded: 0, APY: 0, TVL: 0 },
  likecoin: { bonded: 0, APY: 0, TVL: 0 },
  assetmantle: { bonded: 0, APY: 0, TVL: 0 },
  osmosis: { bonded: 0, APY: 0, TVL: 0 },
  provenance: { bonded: 0, APY: 0, TVL: 0 },
  regen: { bonded: 0, APY: 0, TVL: 0 },
  nolus: { bonded: 0, APY: 0, TVL: 0 },
  sentinelhub: { bonded: 0, APY: 0, TVL: 0 },
  neutron: { bonded: 0, APY: 0, TVL: 0 },
  humansai: { bonded: 0, APY: 0, TVL: 0 },
  stafihub: { bonded: 0, APY: 0, TVL: 0 },
  stride: { bonded: 0, APY: 0, TVL: 0 },
  kyve: { bonded: 0, APY: 0, TVL: 0 },
  ethereum: { bonded: 0, APY: 0, TVL: 0 },
  gravitybridge: { bonded: 0, APY: 0, TVL: 0 },
  jackal: { bonded: 0, APY: 0, TVL: 0 },
  gitopia: { bonded: 0, APY: 0, TVL: 0 },
  coreum: { bonded: 0, APY: 0, TVL: 0 },
  nomic: { bonded: 0, APY: 0, TVL: 0 },
  nym: { bonded: 0, APY: 0, TVL: 0 },
  omniflix: { bonded: 0, APY: 0, TVL: 0 },
  passage: { bonded: 0, APY: 0, TVL: 0 },
  celer: { bonded: 0, APY: 0, TVL: 0 },
  quicksilver: { bonded: 0, APY: 0, TVL: 0 },
  ssv: { bonded: 0, APY: 0, TVL: 0 },
  stargaze: { bonded: 0, APY: 0, TVL: 0 },
  teritori: { bonded: 0, APY: 0, TVL: 0 },
  tgrade: { bonded: 0, APY: 0, TVL: 0 },
  wormhole: { bonded: 0, APY: 0, TVL: 0 },
  vsys: { bonded: 0, APY: 0, TVL: 0 },
  xpla: { bonded: 0, APY: 0, TVL: 0 },
  ununifi: { bonded: 0, APY: 0, TVL: 0 },
  archway: { bonded: 0, APY: 0, TVL: 0 },
  mars: { bonded: 0, APY: 0, TVL: 0 },
};

export const elrondNetworkParams: NetworkProps = {
  elrond: { bonded: 0, APY: 0, TVL: 0 },
};

export const solanaNetworkParams: NetworkProps = {
  solana: { bonded: 0, APY: 0, TVL: 0 },
};

export const oasisNetworkParams: NetworkProps = {
  oasis: { bonded: 0, APY: 0, TVL: 0 },
};

export const radixNetworkParams: NetworkProps = {
  radix: { bonded: 0, APY: 0, TVL: 0 },
};

const cosmosNetworkKeys = [
  'e-money',
  'akash',
  'bitsong',
  'agoric',
  'fetch-ai',
  'crypto.org',
  'evmos',
  'comdex',
  'axelar',
  'cheqd',
  'persistence',
  'crescent',
  'injective',
  'kava',
  'band',
  'likecoin',
  'assetmantle',
  'osmosis',
  'provenance',
  'regen',
  'sentinel',
  'stafihub',
  'stride',
  // bonded data not available:
  // 'band-protocol',
  'cosmos',
  // 'desmos',
  'ethereum',
  'gravity_bridge',
  'jackal',
  'nomic',
  'nym',
  'omniflix',
  'passage',
  'celer',
  'quicksilver',
  'ssv',
  'stargaze',
  'teritori',
  'tgrade',
  'wormhole',
  'vsys',
  'xpla',
  'ununifi',
  'mars',
  'archway',
  'coreum',
  'gitopia',
  'kyve',
  'humansai',
  'neutron',
  'nolus',
].sort();

const getNetworkKeysArray = () => {
  const arr = [];
  cosmosNetworkKeys.map((key) => arr.push(key));
  arr.push('elrond', 'solana', 'oasis', 'radix');
  arr.sort();
  return arr;
};

export const allNetworkKeys = getNetworkKeysArray();

export const getNetworkParams = (key: string) => {
  return cosmosNetworkParams[key] ?? {};
};
