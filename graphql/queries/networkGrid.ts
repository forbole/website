import { gql } from "@apollo/client";

export const networkGridQuery = gql`
  query NetworkGrid {
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
    suiBondedToken {
      bondedToken
    }
  }
`;
