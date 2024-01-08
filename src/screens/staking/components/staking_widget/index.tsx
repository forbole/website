import { memo, useContext } from "react";

import type { Account } from "../../lib/context";
import {
  ChainId,
  StakingContext,
  WalletId,
  getUserAccountsForNetwork,
} from "../../lib/context";

type Props = {
  celestiaAccounts: Account[] | undefined;
  cosmosAccounts: Account[] | undefined;
};

const StakingComponentBase = ({ celestiaAccounts, cosmosAccounts }: Props) => (
  <div>
    StakingWidget:{" "}
    {!!cosmosAccounts &&
      cosmosAccounts.map((account) => (
        <div key={account.address}>Account: {account.address}</div>
      ))}
    {!!celestiaAccounts &&
      celestiaAccounts.map((account) => (
        <div key={account.address}>Account: {account.address}</div>
      ))}
  </div>
);

const StakingComponent = memo(StakingComponentBase);

const StakingWidgetContainer = () => {
  const stakingContext = useContext(StakingContext);

  return (
    <StakingComponent
      celestiaAccounts={getUserAccountsForNetwork(
        stakingContext,
        WalletId.Keplr,
        ChainId.CelestiaTestnet,
      )}
      cosmosAccounts={getUserAccountsForNetwork(
        stakingContext,
        WalletId.Keplr,
        ChainId.CosmosHubTestnet,
      )}
    />
  );
};

export default StakingWidgetContainer;
