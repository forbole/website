export const getEachCosmosCommission = () => `
    query EachCosmosCommission {
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
