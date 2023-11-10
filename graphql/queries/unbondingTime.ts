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
