declare module '*.svg';

interface Calculator {
  bonded: string;
  inflation: string;
  supply: string;
  stakingParams: string;
}

// eslint-disable-next-line no-unused-vars
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

// interface Network {
//   name: string;
//   links: Array<NetworkLink>;
// }
