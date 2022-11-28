export const getAllCosmosTVL = () => `
    query AllCosmosTVL {
        allCosmosTVL {
            cosmosTVL
        }
    }
`;

export const getEachCosmosTVL = () => `
    query EachCosmosTVL {
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
