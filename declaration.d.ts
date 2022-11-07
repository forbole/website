/* eslint-disable no-unused-vars */
declare module '*.svg';

interface Calculator {
  bonded: string;
  inflation: string;
  supply: string;
  stakingParams: string;
}

interface Network {
  image: string;
  name: string;
  label?: string;
  key: string;
  denom?: string;
  color?: string;
  heightSocket?: string;
  bigDipper?: string;
  delegate: string;
  calculator?: Calculator;
}

interface MetricProps {
  chain_id: string;
  instance: string;
  denom?: string;
  validator_address?: string;
  __typename: string;
}

interface BondedProps {
  bondedToken: string;
  metric: MetricProps;
}

// interface Network {
//   name: string;
//   links: Array<NetworkLink>;
// }
