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

export const getSolanaCommission = () => `
    query SolanaCommission {
        solanaCommission {
        metric {
            instance
            validator_address
        }
        commissionRate
        }
    }
`;
