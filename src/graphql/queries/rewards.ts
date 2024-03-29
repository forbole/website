import { gql } from "urql";

export const rewardsQuery = gql`
  query Rewards {
    eachCosmosBondedToken {
      metric {
        chain_id
        instance
      }
      bondedToken
    }
    eachCosmosCommission {
      metric {
        chain_id
        instance
      }
      commissionRate
    }
    eachCosmosInflationRate {
      metric {
        chain_id
        instance
      }
      inflationRate
    }
    eachCosmosTokenSupply {
      metric {
        instance
        chain_id
      }
      supply
    }
  }
`;
