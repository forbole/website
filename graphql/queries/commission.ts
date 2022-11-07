export const getEachCosmosBondedToken = () => `
    query Query {
        eachCosmosCommission {
            metric {
              chain_id
              instance
              validator_address
            }
            commissionRate
        }
    }
`;
