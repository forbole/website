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
};

export const getNetworkInfo = (key: string | number) => {
  return logos[key] ?? {};
};
