import { gql } from "urql";

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
    radixBondedToken {
      bondedToken
    }
    radixAPY {
      APY
    }
    radixTVL {
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
