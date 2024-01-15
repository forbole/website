import useTranslation from "next-translate/useTranslation";
import { memo, useContext } from "react";

import HighlightButton from "@src/components/highlight-button";
import LoadingSpinner from "@src/components/loading_spinner";
import {
  StakingContext,
  getUserAccountsForNetwork,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import type { Account } from "@src/screens/staking/lib/context/types";
import { ChainId, WalletId } from "@src/screens/staking/lib/context/types";

import { useInitStaking } from "../hooks";
import * as styles from "./index.module.scss";

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
          setState({ selectedAction: "stake" });
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

const StakingWidgetBase = ({ celestiaAccounts, cosmosAccounts }: Props) => {
  const { t } = useTranslation("staking");
  const { state: stakingState } = useContext(StakingContext);

  if (!celestiaAccounts && !cosmosAccounts) {
    const { hasInit } = stakingState;

    return (
      <HighlightButton className={styles.connectButton}>
        {hasInit ? t("stakingWidget.connectWallet") : <LoadingSpinner />}
      </HighlightButton>
    );
  }

  return (
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
};

const StakingComponent = memo(StakingWidgetBase);

const StakingWidgetContainer = () => {
  const stakingContext = useContext(StakingContext);

  useInitStaking();

  return (
    <StakingComponent
      celestiaAccounts={getUserAccountsForNetwork(
        stakingContext.state,
        WalletId.Keplr,
        ChainId.CelestiaTestnet,
      )}
      cosmosAccounts={getUserAccountsForNetwork(
        stakingContext.state,
        WalletId.Keplr,
        ChainId.CosmosHubTestnet,
      )}
    />
  );
};

export default StakingWidgetContainer;
