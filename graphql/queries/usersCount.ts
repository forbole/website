export const getCosmosUsersCount = () => `
    query CosmosUsersCount {
        cosmosUsersCount {
            usersCount
        }
    }
`;

export const getSolanaUsersCount = () => `
    query SolanaUsers {
        solanaUsers {
        metric {
            instance
            validator_address
        }
        usersCount
        }
    }
`;
