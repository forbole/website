/* eslint-disable no-useless-computed-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import * as R from 'ramda';

interface IStringIndex extends Record<string, any> {}

/**
 * Takes the key name and returns the location. Will return null if undefined
 */

const logos: IStringIndex = {
  cosmos: {
    image: '/images/network/cosmos_hub.png',
    name: 'Cosmos Hub',
    label: 'Cosmos Hub - ATOM',
    key: 'cosmos',
    value: 'cosmos',
    denom: 'ATOM',
    color: '#ba3fd9',
    bigDipper: 'https://cosmos.bigdipper.live/',
    delegate:
      'https://cosmos.bigdipper.live/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj/delegate',
    heightSocket: 'wss://ws.cosmoshub.forbole.com',
    calculator: {
      bonded: 'http://lcd.cosmoshub.bigdipper.live/staking/pool',
      inflation: 'http://lcd.cosmoshub.bigdipper.live/minting/inflation',
      supply: 'http://lcd.cosmoshub.bigdipper.live/supply/total/uatom',
      stakingParams:
        'http://lcd.cosmoshub.bigdipper.live/staking/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj',
    },
  },
  agoric: {
    image: '/images/network/agoric.png',
    name: 'Agoric',
    key: 'agoric',
    delegate:
      'https://wallet.keplr.app/#/agoric/stake?tab=inactive-validators&modal=detail&validator=agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g',
    bigDipper: 'https://testnet.explorer.agoric.net/',
  },
  akash: {
    image: '/images/network/akash.png',
    name: 'Akash',
    label: 'Akash - AKT',
    key: 'akash',
    denom: 'AKT',
    color: '#eb3825',
    bigDipper: 'https://akash.bigdipper.live/',
    delegate:
      'https://akash.bigdipper.live/validator/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073/delegate',
    heightSocket: 'wss://ws.akash.forbole.com',
    calculator: {
      bonded: 'https://api.akash.forbole.com/staking/pool',
      inflation: 'https://api.akash.forbole.com/minting/inflation',
      supply: 'https://api.akash.forbole.com/bank/total/uakt',
      stakingParams:
        'https://api.akash.forbole.com/staking/validators/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073',
    },
  },
  ['band-protocol']: {
    image: '/images/network/band_protocol.png',
    name: 'Band Protocol',
    label: 'Band Protocol - BAND',
    key: 'band-protocol',
    denom: 'BAND',
    color: '#516FFA',
    heightSocket: 'wss://ws.band.forbole.com',
    bigDipper: 'https://band.bigdipper.live/',
    delegate: 'https://atomicwallet.io/band-staking',
    calculator: {
      bonded: 'http://lcd.band.forbole.com/staking/pool',
      inflation: 'http://lcd.band.forbole.com/minting/inflation',
      supply: 'http://lcd.band.forbole.com/supply/total/uband',
      stakingParams:
        'http://lcd.band.forbole.com/staking/validators/bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z',
    },
  },
  bitsong: {
    image: '/images/network/bitsong.png',
    name: 'BitSong',
    key: 'bitsong',
    delegate: 'https://wallet.bitsong.io/#/authentication/login',
  },
  'crypto.org': {
    image: '/images/network/crypto_org.png',
    name: 'Crypto.org',
    key: 'crypto-org',
    delegate:
      'https://crypto-org.bigdipper.live/validator/crocncl15xphw2m025acwnjd2ucq9t5ku4ggaqyecekzqa',
    bigDipper: 'https://crypto-org.bigdipper.live/',
  },
  desmos: {
    image: '/images/network/desmos.png',
    name: 'Desmos',
    key: 'desmos',
    bigDipper: 'https://morpheus.desmos.network/',
  },
  ['e-money']: {
    image: '/images/network/e_money.png',
    name: 'eMoney',
    key: 'e-money',
    color: '#1e5877',
    bigDipper: 'https://e-money.network/',
    delegate:
      'https://wallet.e-money.com/earn/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y',
    heightSocket: 'wss://ws.emoney.forbole.com',
    calculator: {
      bonded: 'http://lcd.emoney.forbole.com/staking/pool',
      inflation: 'http://lcd.emoney.forbole.com/minting/inflation',
      supply: 'http://lcd.emoney.forbole.com/supply/total/nanolike',
      stakingParams:
        'http://lcd.emoney.forbole.com/staking/validators/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y',
    },
  },
  evmos: {
    image: '/images/network/evmos.png',
    name: 'Evmos',
    key: 'evmos',
    delegate: 'https://app.evmos.org/staking',
  },
  ['fetch-ai']: {
    image: '/images/network/fetch_ai.png',
    name: 'Fetch.ai',
    key: 'fetch-ai',
    delegate:
      'https://explore.fetch.ai/validator/fetchvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0dzxfx3',
    bigDipper: 'https://explore.fetch.ai/',
  },
  comdex: {
    image: '/images/network/comdex.png',
    name: 'Comdex',
    key: 'comdex',
    address: 'comdexvaloper1e4wjh48ks5j5d9702d35q360ffmf3jj2xpuf3f',
  },
};

export const getNetworkInfo = (key: string | number) => {
  return logos[key] ?? {};
};
