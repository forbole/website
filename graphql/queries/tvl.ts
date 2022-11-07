export const getAllCosmosTVL = () => `
    query Query {
        allCosmosTVL {
            cosmosTVL
        }
    }
`;

export const getEachCosmosTVL = () => `
    query Query {
        eachCosmosTVL {
            metric {
                chain_id
                denom
                instance
                validator_address
            }
            TVL
        }
    }
`;
