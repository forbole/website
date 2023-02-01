type ParamsProps = {
  inflation: number;
  stakingRatio: number;
  commissionRate: number;
  bondedToken?: number;
  totalSupply?: number;
};

export type NetworkProps = {
  [key: string]: ParamsProps;
};

const baseState = {
  inflation: 0,
  stakingRatio: 0,
  commissionRate: 0,
  bondedToken: 0,
  totalSupply: 0,
};

// sample data
const stakingParams: NetworkProps = {
  cosmos: {
    inflation: 0.1273,
    stakingRatio: 0.6693,
    commissionRate: 0.095,
    bondedToken: 197693300,
    totalSupply: 292586164,
  },
  agoric: baseState,
  akash: baseState,
  axelar: baseState,
  bitcanna: baseState,
  bitsong: baseState,
  fetchai: baseState,
  cro: baseState,
  evmos: baseState,
  comdex: baseState,
  cheqd: baseState,
  chihuahua: baseState,
  terra_classic: baseState,
  persistence: baseState,
  crescent: baseState,
  ixo: baseState,
  injective: baseState,
  juno: baseState,
  kava: baseState,
  band: baseState,
  likecoin: baseState,
  assetmantle: baseState,
  osmosis: baseState,
  provenance: baseState,
  regen: baseState,
  secret: baseState,
  sentinelhub: baseState,
  shentu: baseState,
  sifchain: baseState,
  sommelier: baseState,
  stafihub: baseState,
  stride: baseState,
  gravity_bridge: baseState,
  jackal: baseState,
  terra: baseState,
};

export const getStakingParams = (key: string) => {
  return stakingParams[key] ?? {};
};
