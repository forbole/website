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
