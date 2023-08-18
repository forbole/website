export const getEachCosmosUnbondingTime = () => `
    query EachCosmosUnbondingTime {
        eachCosmosUnbondingTime {
            metric {
              chain_id
              instance
            }
            unbondingTime
        }
    }
`;

export const getRadixUnbondingTime = () => `
    query RadixUnbondingTime {
        radixUnbondingTime {
        metric {
            instance
        }
        unbondingTime
        }
    }
`;

export const getSolanaUnbondingTime = () => `
    query SolanaUnbondingTime {
        solanaUnbondingTime {
        metric {
            instance
        }
        unbondingTime
        }
    }
`;

export const getElrondUnbondingTime = () => `
    query ElrondUnbondingTime {
        elrondUnbondingTime {
        metric {
            instance
        }
        unbondingTime
        }
    }
`;
