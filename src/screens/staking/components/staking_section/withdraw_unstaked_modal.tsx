import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import {
  displayGenericError,
  notEnoughGasError,
} from "@src/screens/staking/lib/error";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  setSelectedAccount,
  syncAccountData,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import {
  getSelectedAccount,
  getStakeAccountsForNetwork,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import { accountHasRewards } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  handleWalletClose,
  withdrawnUnstaked,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { ClaimRewardsError } from "@src/screens/staking/lib/staking_sdk/wallet_operations/base";

import * as styles from "./claim_rewards_modal.module.scss";
import Label from "./label";
import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";
import StakeAccountsSelect from "./stake_accounts_select";

const WithdrawUnstakedModal = () => {
  const stakingRef = useStakingRef();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedStakeAccount, setSelectedStakeAccount] = useState<
    null | string
  >(null);

  const { t } = useTranslation("staking");

  const { selectedAction } = stakingRef.current.state;

  const selectedAccount = getSelectedAccount(stakingRef.current.state);
  const isOpen = !!selectedAccount && selectedAction === "withdraw_unstake";
  const { address, networkId } = selectedAccount || {};

  useEffect(() => {
    if (isOpen) {
      return () => {
        setSelectedStakeAccount(null);
      };
    }
  }, [isOpen]);

  const inactiveStakeAccounts = (
    selectedAccount
      ? getStakeAccountsForNetwork(
          stakingRef.current.state,
          selectedAccount.networkId,
          address,
        )
      : []
  ).filter((acc) => acc.status === "inactive");

  const hasRewards =
    !!inactiveStakeAccounts?.length ||
    (selectedAccount ? accountHasRewards(selectedAccount) : null);

  const onClose = () => {
    if (isLoading) return;

    setSelectedAccount(stakingRef.current, null, null);
  };

  if (!isOpen) return null;

  return (
    <ModalBase
      onClose={onClose}
      open={isOpen}
      title={t("withdrawUnstaked.title")}
    >
      <div className={styles.wrapper}>
        <div className={styles.selectGroup}>
          <Label>{t("withdrawUnstaked.fromWallet")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect
                accountFilter={(acc) =>
                  !!acc.info?.stakeAccounts?.some(
                    (a) => a.status === "inactive",
                  )
                }
                disabled={isLoading}
                variant="accounts_wallet"
              />
            )}
          </div>
        </div>
        <div className={styles.selectGroup}>
          <Label>{t("withdrawUnstaked.selectAcc")}</Label>
          <div>
            {selectedAccount && (
              <StakeAccountsSelect
                accounts={inactiveStakeAccounts}
                disabled={isLoading}
                onChange={setSelectedStakeAccount}
                selectedAccount={selectedStakeAccount}
              />
            )}
          </div>
        </div>
        <HighlightButton
          disabled={!address || !networkId || isLoading || !hasRewards}
          onClick={() => {
            const usedSelectedStakeAccount =
              selectedStakeAccount || inactiveStakeAccounts[0]?.address;

            if (
              !selectedAccount?.address ||
              !usedSelectedStakeAccount ||
              isLoading
            )
              return;

            setIsLoading(true);

            withdrawnUnstaked({
              account: selectedAccount,
              stakeAccountAddress: usedSelectedStakeAccount,
            })
              .then(async (withdrawn) => {
                if (withdrawn.success) {
                  await new Promise<void>((resolve) =>
                    setTimeout(resolve, 5000),
                  );

                  await syncAccountData(
                    stakingRef.current,
                    selectedAccount as NonNullable<typeof selectedAccount>,
                  );

                  setSelectedAccount(stakingRef.current, null, null);

                  toastSuccess({
                    title: t("withdrawUnstaked.success.title"),
                  });
                } else if (withdrawn.error) {
                  const handlers: Record<ClaimRewardsError, () => void> = {
                    [ClaimRewardsError.None]: () => {
                      handleWalletClose(selectedAccount);
                    },
                    [ClaimRewardsError.NotEnoughGas]: () => {
                      notEnoughGasError(t);
                    },
                    [ClaimRewardsError.Unknown]: () => {
                      displayGenericError(t);
                    },
                  };

                  handlers[withdrawn.error]?.();
                }
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log("debug: claim_rewards_modal.tsx: error", error);

                displayGenericError(t);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          pinkShadow
          size="big"
        >
          {isLoading ? <LoadingSpinner /> : t("withdrawUnstaked.button")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default WithdrawUnstakedModal;
