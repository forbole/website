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

export const getSolanaTVL = () => `
    query SolanaTVL {
        solanaTVL {
        metric {
            instance
            validator_address
        }
        TVL
        }
    }
`;

export const getElrondTVL = () => `
    query ElrondTVL {
        elrondTVL {
        metric {
            instance
        }
        TVL
        }
    }
`;
