import { memo, useContext } from "react";

import {
  ChainId,
  StakingContext,
  WalletId,
  getUserAccountsForNetwork,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import type { Account } from "@src/screens/staking/lib/context";

type WalletAccountProps = {
  address: string;
  chainId: ChainId;
  wallet: WalletId;
};

const WalletAccount = ({ address, chainId, wallet }: WalletAccountProps) => {
  const { setState } = useContext(StakingContext);

  return (
    <div>
      [{wallet}]: {chainId}: {address}{" "}
      <button
        onClick={() => {
          setSelectedAccount(setState, { address, chainId, wallet });
        }}
      >
        Check
      </button>
    </div>
  );
};

type Props = {
  celestiaAccounts: Account[] | undefined;
  cosmosAccounts: Account[] | undefined;
};

const StakingWidgetBase = ({ celestiaAccounts, cosmosAccounts }: Props) => (
  <div>
    StakingWidget:{" "}
    {!!cosmosAccounts &&
      cosmosAccounts.map((account) => (
        <WalletAccount
          address={account.address}
          chainId={ChainId.CosmosHubTestnet}
          key={account.address}
          wallet={WalletId.Keplr}
        />
      ))}
    {!!celestiaAccounts &&
      celestiaAccounts.map((account) => (
        <WalletAccount
          address={account.address}
          chainId={ChainId.CelestiaTestnet}
          key={account.address}
          wallet={WalletId.Keplr}
        />
      ))}
  </div>
);

const StakingComponent = memo(StakingWidgetBase);

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
