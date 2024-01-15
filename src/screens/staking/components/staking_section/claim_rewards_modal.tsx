/* eslint-disable no-console */
import type { Coin } from "@cosmjs/stargate";
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import { toastSuccess } from "@src/components/notification";
import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import {
  claimRewards,
  getClaimRewardsFee,
} from "@src/screens/staking/lib/context/operations";

import { formatDenom } from "../../lib/context/formatters";
import { displayGenericError } from "../../lib/error";
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
  const { address, chainId } = selectedAccount || {};

  useEffect(() => {
    if (isOpen && chainId && address) {
      setGasFee(null);

      getClaimRewardsFee({ address, chainId }).then((fee) => {
        setGasFee(fee);
      });
    }
  }, [isOpen, chainId, address]);

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("claimRewards.title")}
    >
      <div className={styles.wrapper}>
        <NetworksSelect variant="accounts" />
        {gasFee && (
          <div className={styles.feeRow}>
            <div>{t("rewardsModal.gasFee")}</div>
            <div>{formatDenom(gasFee.denom, gasFee.amount)}</div>
          </div>
        )}
        <HighlightButton
          disabled={!address || !chainId || isLoading}
          onClick={() => {
            if (!address || !chainId || isLoading) return;

            setIsLoading(true);

            claimRewards({
              address,
              chainId,
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
