type ParamsProps = {
  inflation: number;
  stakingRatio: number;
  commissionRate: number;
  bondedToken?: number;
  totalSupply?: number;
};

type NetworkProps = {
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
  agoric: baseState,
  akash: baseState,
  assetmantle: baseState,
  axelar: baseState,
  band: baseState,
  bitcanna: baseState,
  bitsong: baseState,
  cheqd: baseState,
  chihuahua: baseState,
  comdex: baseState,
  cosmos: {
    inflation: 0.1273,
    stakingRatio: 0.6693,
    commissionRate: 0.095,
    bondedToken: 197693300,
    totalSupply: 292586164,
  },
  crescent: baseState,
  cro: baseState,
  evmos: baseState,
  fetchai: baseState,
  gravity_bridge: baseState,
  injective: baseState,
  ixo: baseState,
  jackal: baseState,
  juno: baseState,
  kava: baseState,
  likecoin: baseState,
  osmosis: baseState,
  persistence: baseState,
  provenance: baseState,
  regen: baseState,
  secret: baseState,
  sentinelhub: baseState,
  shentu: baseState,
  sommelier: baseState,
  stafihub: baseState,
  stargaze: baseState,
  stride: baseState,
  teritori: baseState,
  terra: baseState,
  terra_classic: baseState,
};

export const getStakingParams = (key: string) => stakingParams[key] ?? {};
