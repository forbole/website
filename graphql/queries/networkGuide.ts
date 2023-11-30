import { gql } from "@apollo/client";

export const networkGuideQuery = gql`
  query NetworkGuide {
    eachCosmosAPY {
      metric {
        chain_id
        instance
      }
      APY
    }
    eachCosmosCommission {
      metric {
        chain_id
        instance
        validator_address
      }
      commissionRate
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
    eachCosmosUnbondingTime {
      metric {
        chain_id
        instance
      }
      unbondingTime
    }
    suiAPY {
      APY
    }
  }
`;
