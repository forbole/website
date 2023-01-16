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

export const getElrondUsersCount = () => `
    query ElrondUsers {
        elrondUsers {
        metric {
            instance
        }
        usersCount
        }
    }
`;

export const getOasisUsersCount = () => `
    query OasisUsers {
        oasisUsers {
        metric {
            instance
            validator_address
        }
        usersCount
        }
    }
`;

export const getRadixUsersCount = () => `
    query RadixUsers {
        radixUsers {
        metric {
            instance
            validator_address
        }
        usersCount
        }
    }
`;
