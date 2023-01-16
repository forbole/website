export type ParamsProps = {
  bonded: number;
  APY: number;
  TVL: number;
};

export type NetworkProps = {
  [key: string]: ParamsProps;
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
  bitcanna: { bonded: 0, APY: 0, TVL: 0 },
  cheqd: { bonded: 0, APY: 0, TVL: 0 },
  chihuahua: { bonded: 0, APY: 0, TVL: 0 },
  terra_classic: { bonded: 0, APY: 0, TVL: 0 },
  persistence: { bonded: 0, APY: 0, TVL: 0 },
  crescent: { bonded: 0, APY: 0, TVL: 0 },
  ixo: { bonded: 0, APY: 0, TVL: 0 },
  injective: { bonded: 0, APY: 0, TVL: 0 },
  juno: { bonded: 0, APY: 0, TVL: 0 },
  kava: { bonded: 0, APY: 0, TVL: 0 },
  band: { bonded: 0, APY: 0, TVL: 0 },
  likecoin: { bonded: 0, APY: 0, TVL: 0 },
  assetmantle: { bonded: 0, APY: 0, TVL: 0 },
  osmosis: { bonded: 0, APY: 0, TVL: 0 },
  provenance: { bonded: 0, APY: 0, TVL: 0 },
  regen: { bonded: 0, APY: 0, TVL: 0 },
  secret: { bonded: 0, APY: 0, TVL: 0 },
  sentinelhub: { bonded: 0, APY: 0, TVL: 0 },
  shentu: { bonded: 0, APY: 0, TVL: 0 },
  sifchain: { bonded: 0, APY: 0, TVL: 0 },
  sommelier: { bonded: 0, APY: 0, TVL: 0 },
  stafihub: { bonded: 0, APY: 0, TVL: 0 },
  stride: { bonded: 0, APY: 0, TVL: 0 },
  cardano: { bonded: 0, APY: 0, TVL: 0 },
  certik: { bonded: 0, APY: 0, TVL: 0 },
  ethereum: { bonded: 0, APY: 0, TVL: 0 },
  gravity_bridge: { bonded: 0, APY: 0, TVL: 0 },
};

export const elrondNetworkParams: NetworkProps = {
  elrond: { bonded: 0, APY: 0, TVL: 0 },
};

export const solanaNetworkParams: NetworkProps = {
  solana: { bonded: 0, APY: 0, TVL: 0 },
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
  'bitcanna',
  'cheqd',
  'chihuahua',
  'terra_classic',
  'persistence',
  'crescent',
  'ixo',
  'injective',
  'juno',
  'kava',
  'band',
  'likecoin',
  'assetmantle',
  'osmosis',
  'provenance',
  'regen',
  'secret',
  'sentinel',
  'shentu',
  'sifchain',
  'sommelier',
  'stafihub',
  'stride',
  // bonded data not available:
  // 'band-protocol',
  'cosmos',
  // 'desmos',
  'cardano',
  'certik',
  'ethereum',
  'gravity_bridge',
].sort();

const getNetworkKeysArray = () => {
  const arr = [];
  cosmosNetworkKeys.map((key) => arr.push(key));
  arr.push('elrond', 'solana');
  arr.sort();
  return arr;
};

export const allNetworkKeys = getNetworkKeysArray();

export const getNetworkParams = (key: string) => {
  return cosmosNetworkParams[key] ?? {};
};
