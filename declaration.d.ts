/* eslint-disable no-unused-vars */
declare module "*.svg";

interface Calculator {
  bonded: string;
  inflation: string;
  supply: string;
  stakingParams: string;
}

interface Network {
  bigDipper?: string;
  calculator?: Calculator;
  color?: string;
  delegate: string;
  denom?: string;
  guide?: string;
  heightSocket?: string;
  image: string;
  key: string;
  label?: string;
  name: string;
}

interface MetricProps {
  __typename: string;
  chain_id: string;
  denom?: string;
  instance: string;
}

interface BondedProps {
  bondedToken: string;
  metric: MetricProps;
}
