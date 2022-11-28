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
