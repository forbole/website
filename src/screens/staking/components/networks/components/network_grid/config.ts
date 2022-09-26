export type ParamsProps = {
  bonded: number;
  APY: number;
  TVL: number;
};

type NetworkProps = {
  [key: string]: ParamsProps;
};

// sample data
export const networkParams: NetworkProps = {
  cosmos: { bonded: 2414514, APY: 246, TVL: 123345678312 },
};

export const networkKeys = [
  'cosmos',
  'e-money',
  'band-protocol',
  'akash',
  'bitsong',
  'agoric',
  'fetch-ai',
  'crypto.org',
  'evmos',
  'desmos',
].sort();

export const getNetworkParams = (key: string) => {
  return networkParams[key] ?? {};
};
