export const getEachCosmosBondedToken = () => `
    query Query {
        eachCosmosBondedToken {
            metric {
              chain_id
              instance
            }
            bondedToken
        }
    }
`;
