export const getEachCosmosTokenSupply = () => `
    query CosmosTokenSupply {
        eachCosmosTokenSupply {
        metric {
            instance
            chain_id
        }
        supply
        }
    }
`;

export const getRadixTokenSupply = () => `
    query RadixTotalSupply {
        allRadixTotalSupply {
        metric {
            instance
        }
        supply
        }
    }
`;

export const getElrondTokenSupply = () => `
    query ElrondCirculatingSupply {
        elrondCirculatingSupply {
        metric {
            instance
        }
        circulatingSupply
        }
    }
`;
