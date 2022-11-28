export const getEachCosmosAPY = () => `
    query EachCosmosAPY {
        eachCosmosAPY {
            metric {
              chain_id
              instance
            }
            APY
        }
    }
`;
