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
import { getSelectedAccount } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import type { Coin } from "@src/screens/staking/lib/staking_sdk/core";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import { accountHasRewards } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  claimRewards,
  getClaimRewardsFee,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { ClaimRewardsError } from "@src/screens/staking/lib/staking_sdk/wallet_operations/base";

import * as styles from "./claim_rewards_modal.module.scss";
import Label from "./label";
import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";

const ClaimRewardsModal = () => {
  const stakingRef = useStakingRef();

  const [gasFee, setGasFee] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("staking");

  const { selectedAction } = stakingRef.current.state;

  const selectedAccount = getSelectedAccount(stakingRef.current.state);
  const isOpen = !!selectedAccount && selectedAction === "claim_rewards";
  const { address, networkId } = selectedAccount || {};

  const hasRewards = selectedAccount
    ? accountHasRewards(selectedAccount)
    : null;

  useEffect(() => {
    if (isOpen && selectedAccount?.address) {
      setGasFee(null);

      getClaimRewardsFee({ account: selectedAccount }).then(setGasFee);
    }
  }, [isOpen, selectedAccount]);

  const onClose = () => {
    if (isLoading) return;

    setSelectedAccount(stakingRef.current, null, null);
  };

  return (
    <ModalBase onClose={onClose} open={isOpen} title={t("claimRewards.title")}>
      <div className={styles.wrapper}>
        <div className={styles.selectGroup}>
          <Label>{t("claimRewards.claimFrom")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect disabled={isLoading} variant="accounts_wallet" />
            )}
          </div>
        </div>
        <div className={styles.selectGroup}>
          <Label>{t("claimRewards.selectNetwork")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect
                disabled={isLoading}
                variant="accounts_with_rewards"
              />
            )}
          </div>
        </div>
        {gasFee && (
          <div className={styles.feeRow}>
            <div>{t("rewardsModal.gasFee")}</div>
            <div>
              {formatCoin({ amount: gasFee.amount, denom: gasFee.denom })}
            </div>
          </div>
        )}
        <HighlightButton
          disabled={!address || !networkId || isLoading || !hasRewards}
          onClick={() => {
            if (!selectedAccount?.address || isLoading) return;

            setIsLoading(true);

            claimRewards({
              account: selectedAccount,
            })
              .then(async (claimed) => {
                if (claimed.success) {
                  await syncAccountData(
                    stakingRef.current,
                    selectedAccount as NonNullable<typeof selectedAccount>,
                  );

                  setSelectedAccount(stakingRef.current, null, null);

                  toastSuccess({
                    subtitle: `${t("rewardsModal.success.sub")} 🎉`,
                    title: t("rewardsModal.success.title"),
                  });
                } else if (claimed.error) {
                  const handlers: Record<ClaimRewardsError, () => void> = {
                    [ClaimRewardsError.None]: () => {},
                    [ClaimRewardsError.NotEnoughGas]: () => {
                      notEnoughGasError(t);
                    },
                    [ClaimRewardsError.Unknown]: () => {
                      displayGenericError(t);
                    },
                  };

                  handlers[claimed.error]?.();
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
          {isLoading ? <LoadingSpinner /> : t("rewardsModal.button")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default ClaimRewardsModal;
