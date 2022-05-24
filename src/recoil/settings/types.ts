import { DefaultValue } from 'recoil';

export type Theme = 'light' | 'dark' | 'device';

export type AtomState = {
  theme: Theme;
};
