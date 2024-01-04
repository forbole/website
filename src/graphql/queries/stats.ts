import { gql } from "urql";

export const statsQuery = gql`
  query Stats {
    allCosmosTVL {
      cosmosTVL
    }
    archwayTVL {
      TVL
    }
    cosmosUsersCount {
      usersCount
    }
    elrondTVL {
      TVL
    }
    elrondUsers {
      usersCount
    }
    oasisTVL {
      TVL
    }
    oasisUsers {
      usersCount
    }
    radixTVL {
      TVL
    }
    radixUsers {
      usersCount
    }
    solanaTVL {
      TVL
    }
    solanaUsers {
      usersCount
    }
    suiTVL {
      TVL
    }
  }
`;
