/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import { toastSuccess } from "@src/components/notification";
import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { claimRewards } from "@src/screens/staking/lib/context/operations";
import { ChainId } from "@src/screens/staking/lib/context/types";

import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";

const ClaimRewardsModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const [selectedNetwork, setSelectedNetwork] = useState<ChainId>(
    ChainId.CosmosHubTestnet,
  );

  const { t } = useTranslation("staking");

  const { selectedAccount, selectedAction } = stakingState;

  const isOpen = !!selectedAccount && selectedAction === "claim_rewards";

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("claimRewards.title")}
    >
      <NetworksSelect setValue={setSelectedNetwork} value={selectedNetwork} />
      <div>
        <div>Gas Fee</div>
        <div>0.002 ATOM</div>
      </div>
      <HighlightButton
        onClick={() => {
          if (!selectedAccount) return;

          const { address, chainId } = selectedAccount;

          claimRewards({
            address,
            chainId,
          })
            .then(() => {
              toastSuccess({
                title: "Rewards claimed",
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        pinkShadow
        size="big"
      >
        {t("rewardsModal.button")}
      </HighlightButton>
    </ModalBase>
  );
};

export default ClaimRewardsModal;
