export const getAllCosmosTVL = () => `
    query AllCosmosTVL {
        allCosmosTVL {
            cosmosTVL
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

export const getOasisTVL = () => `
    query OasisTVL {
        oasisTVL {
        metric {
            instance
        }
        TVL
        }
    }
`;

export const getRadixTVL = () => `
    query RadixTVL {
        radixTVL {
        metric {
            validator_address
            instance
        }
        TVL
        }
    }
`;
