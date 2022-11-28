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
