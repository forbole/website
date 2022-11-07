export const getEachCosmosAPY = () => `
    query Query {
        eachCosmosAPY {
            metric {
              chain_id
              instance
            }
            APY
        }
    }
`;
