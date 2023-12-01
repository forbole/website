import { gql } from "@apollo/client";

export const networkGridQuery = gql`
  query NetworkGrid {
    archwayBondedToken {
      bondedToken
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
        validator_address
      }
      TVL
    }
    elrondAPY {
      metric {
        instance
        validator_address
      }
      APY
    }
    elrondBondedToken {
      metric {
        instance
        validator_address
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
        validator_address
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
        validator_address
      }
      bondedToken
    }
    radixTVL {
      metric {
        validator_address
        instance
      }
      TVL
    }
    solanaBondedToken {
      metric {
        instance
        validator_address
      }
      bondedToken
    }
    solanaTVL {
      metric {
        instance
        validator_address
      }
      TVL
    }
    suiAPY {
      APY
    }
    suiBondedToken {
      bondedToken
    }
  }
`;
