type ParamsProps = {
  inflation: number;
  stakingRatio: number;
  commissionRate: number;
};

type NetworkProps = {
  [key: string]: ParamsProps;
};

const stakingParams: NetworkProps = {
  cosmos: { inflation: 0.1273, stakingRatio: 0.6693, commissionRate: 0.095 },
};

export const getStakingParams = (key: string) => {
  return stakingParams[key] ?? {};
};
