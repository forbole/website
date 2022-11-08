export type ParamsProps = {
  bonded: number;
  APY: number;
  TVL: number;
};

type NetworkProps = {
  [key: string]: ParamsProps;
};

// state data

export const networkParams: NetworkProps = {
  cosmos: { bonded: 2414514, APY: 246, TVL: 123345678312 },
  emoney: { bonded: 0, APY: 0, TVL: 0 },
  akash: { bonded: 0, APY: 0, TVL: 0 },
  agoric: { bonded: 0, APY: 0, TVL: 0 },
  bitsong: { bonded: 0, APY: 0, TVL: 0 },
  fetchai: { bonded: 0, APY: 0, TVL: 0 },
  cro: { bonded: 0, APY: 0, TVL: 0 },
  evmos: { bonded: 0, APY: 0, TVL: 0 },
  comdex: { bonded: 0, APY: 0, TVL: 0 },
  axelar: { bonded: 0, APY: 0, TVL: 0 },
};

export const networkKeys = [
  'e-money',
  'akash',
  'bitsong',
  'agoric',
  'fetch-ai',
  'crypto.org',
  'evmos',
  'comdex',
  'axelar',
  // bonded data not available:
  // 'band-protocol',
  // 'cosmos',
  // 'desmos',
].sort();

export const getNetworkParams = (key: string) => {
  return networkParams[key] ?? {};
};
