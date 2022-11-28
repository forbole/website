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

export const getRadixBondedToken = () => `
    query RadixStakedTokens {
        allRadixStakedTokens {
        metric {
            instance
            validator_address
        }
        bondedToken
        }
    }
`;

export const getSolanaBondedToken = () => `
    query SolanaBondedToken {
        solanaBondedToken {
        metric {
            instance
            validator_address
        }
        bondedToken
        }
    }
`;
