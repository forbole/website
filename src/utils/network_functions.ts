import * as R from 'ramda';

export const toFixed = (num: number): number => {
  return Number(num?.toFixed(2) ?? '0');
};

// converter needed for querying from external APIs:

export const defaultConverter = (ratio: number) => (num: number) => {
  return num / ratio;
};

export const uXRDToXRD = defaultConverter(1000000000000000000);

export const uEGLDToEGLD = defaultConverter(1000000000000000000);

export const defaultFunctions = (converter: any) => ({
  converter,
});

const elrond = R.clone(defaultFunctions(uEGLDToEGLD));

// networks needed for converter
export const networkFunctions = {
  elrond,
};
