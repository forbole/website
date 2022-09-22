export const searchNetwork = [
  { label: 'Agoric', image: '/images/network/agoric.png' },
  { label: 'Akash', image: '/images/network/akash.png' },
  { label: 'Band Protocol', image: '/images/network/band_protocol.png' },
  { label: 'Bitsong', image: '/images/network/bitsong.png' },
  { label: 'Cosmos Hub', image: '/images/network/cosmos_hub.png' },
  { label: 'Crypto.org', image: '/images/network/crypto_org.png' },
  { label: 'Desmos', image: '/images/network/desmos.png' },
  { label: 'eMoney', image: '/images/network/e_money.png' },
  { label: 'Evmos', image: '/images/network/evmos.png' },
];

export interface NetworkOptionType {
  label: string;
  image: string;
  delegate: string;
}

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
