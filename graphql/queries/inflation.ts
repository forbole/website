export const getEachCosmosInflation = () => `
    query CosmosInflationRate {
        eachCosmosInflationRate {
        metric {
            chain_id
            instance
        }
        inflationRate
        }
    }
`;
