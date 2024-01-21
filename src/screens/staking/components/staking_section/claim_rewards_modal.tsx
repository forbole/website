import type { Coin } from "@cosmjs/stargate";
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import { toastSuccess } from "@src/components/notification";
import { displayGenericError } from "@src/screens/staking/lib/error";
import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/staking_sdk/context";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import {
  claimRewards,
  getClaimRewardsFee,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";

import * as styles from "./claim_rewards_modal.module.scss";
import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";

const ClaimRewardsModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const [gasFee, setGasFee] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("staking");

  const { selectedAccount, selectedAction } = stakingState;
  const isOpen = !!selectedAccount && selectedAction === "claim_rewards";
  const { address, networkId } = selectedAccount || {};

  useEffect(() => {
    if (isOpen && networkId && address) {
      setGasFee(null);

      getClaimRewardsFee({ address, networkId }).then(setGasFee);
    }
  }, [isOpen, networkId, address]);

  const onClose = () => {
    if (isLoading) return;

    setSelectedAccount(setStakingState, null, null);
  };

  return (
    <ModalBase onClose={onClose} open={isOpen} title={t("claimRewards.title")}>
      <div className={styles.wrapper}>
        <NetworksSelect disabled={isLoading} variant="accounts_with_rewards" />
        {gasFee && (
          <div className={styles.feeRow}>
            <div>{t("rewardsModal.gasFee")}</div>
            <div>
              {formatCoin({ amount: gasFee.amount, denom: gasFee.denom })}
            </div>
          </div>
        )}
        <HighlightButton
          disabled={!address || !networkId || isLoading}
          onClick={() => {
            if (!address || !networkId || isLoading) return;

            setIsLoading(true);

            claimRewards({
              address,
              networkId,
            })
              .then((claimed) => {
                if (claimed) {
                  toastSuccess({
                    subtitle: `${t("rewardsModal.success.sub")} 🎉`,
                    title: t("rewardsModal.success.title"),
                  });
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
          {t("rewardsModal.button")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default ClaimRewardsModal;
