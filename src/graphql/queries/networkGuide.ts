import { gql } from "urql";

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
      }
      commissionRate
    }
    eachCosmosTVL {
      metric {
        chain_id
        denom
        instance
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
