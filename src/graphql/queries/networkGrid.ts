import { gql } from "@apollo/client";

export const networkGridQuery = gql`
  query NetworkGrid {
    archwayBondedToken {
      bondedToken
    }
    archwayTVL {
      TVL
    }
    eachCosmosAPY {
      metric {
        chain_id
        instance
      }
      APY
    }
    eachCosmosBondedToken {
      metric {
        chain_id
        instance
      }
      bondedToken
    }
    eachCosmosTVL {
      metric {
        chain_id
        denom
        instance
      }
      TVL
    }
    elrondAPY {
      metric {
        instance
      }
      APY
    }
    elrondBondedToken {
      metric {
        instance
      }
      bondedToken
    }
    elrondTVL {
      metric {
        instance
      }
      TVL
    }
    oasisBondedToken {
      metric {
        instance
      }
      bondedToken
    }
    oasisTVL {
      metric {
        instance
      }
      TVL
    }
    allRadixStakedTokens {
      metric {
        instance
      }
      bondedToken
    }
    radixTVL {
      metric {
        instance
      }
      TVL
    }
    solanaBondedToken {
      metric {
        instance
      }
      bondedToken
    }
    solanaTVL {
      metric {
        instance
      }
      TVL
    }
    suiAPY {
      APY
    }
    suiBondedToken {
      bondedToken
    }
    suiTVL {
      TVL
    }
  }
`;
