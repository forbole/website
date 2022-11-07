export const getEachCosmosUnbondingTime = () => `
    query Query {
        eachCosmosUnbondingTime {
            metric {
              chain_id
              instance
            }
            unbondingTime
        }
    }
`;
