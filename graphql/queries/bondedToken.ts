export const getEachCosmosBondedToken = () => `
    query EachCosmosBondedToken {
        eachCosmosBondedToken {
            metric {
              chain_id
              instance
            }
            bondedToken
        }
    }
`;
