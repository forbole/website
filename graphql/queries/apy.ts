export const getEachCosmosAPY = () => `
    query EachCosmosAPY {
        eachCosmosAPY {
            metric {
              chain_id
              instance
            }
            APY
        }
    }
`;

export const getElrondAPY = () => `
    query ElrondAPY {
        elrondAPY {
        metric {
            instance
            validator_address
        }
        APY
        }
    }
`;
