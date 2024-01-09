/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import {
  ChainId,
  StakingContext,
  getSelectedAccount,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { stakeAmount } from "@src/screens/staking/lib/context/operations";

import Label from "./label";
import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";
import * as styles from "./staking_modal.module.scss";
import { stakingClient } from "./utils/staking_client";

type ModalNetworkInfo = {
  rpc: string;
};

const StakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { t } = useTranslation("staking");

  const { selectedAccount, selectedAction } = stakingState;

  const [selectedNetwork, setSelectedNetwork] = useState<ChainId>(
    ChainId.CosmosHubTestnet,
  );

  const [networkInfo, setNetworkInfo] = useState<ModalNetworkInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const isOpen = !!selectedAccount && selectedAction === "stake";

  useEffect(() => {
    if (isOpen) {
      setNetworkInfo(null);

      const { chainId } = selectedAccount;

      stakingClient.getStakingInfo(chainId).then((info) => {
        if (!info.rpc) {
          return;
        }

        setNetworkInfo({ rpc: info.rpc });
      });
    }
  }, [isOpen, selectedAccount]);

  const account = getSelectedAccount(stakingState);

  if (!account?.info?.balances) return null;

  const availableTokens = [
    account.info.balances.amount,
    account.info.balances.denom,
  ];

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("stakingModal.title")}
    >
      <div className={styles.wrapper}>
        <div>
          <NetworksSelect
            setValue={setSelectedNetwork}
            value={selectedNetwork}
          />
        </div>
        <div className={styles.row}>
          <Label className={styles.apy}>
            <IconInfoCircle
              data-tooltip-content="Foo Tooltip"
              data-tooltip-id={tooltipId}
            />{" "}
            APY
          </Label>
          <div>12%</div>
        </div>
        {availableTokens && (
          <div>
            <Label>{t("stakingModal.available")}</Label>: {availableTokens[0]}{" "}
            {availableTokens[1].toUpperCase()}
          </div>
        )}
        <div className={styles.group}>
          <Label>{t("stakingModal.tokenAmount")}</Label>
          <div className={styles.row}>
            <FormInput
              className={styles.input}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              {...(availableTokens && {
                rightText: availableTokens[1].toUpperCase(),
              })}
              value={amount}
            />{" "}
          </div>
        </div>
        <div className={styles.group}>
          <Label>{t("stakingModal.memo")}</Label>
          <FormInput
            className={styles.input}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
            placeholder={t("optionalInput")}
            value={memo}
          />{" "}
        </div>
        <HighlightButton
          onClick={() => {
            if (!selectedAccount || !networkInfo) return;

            const { address, chainId } = selectedAccount;

            stakeAmount({
              address,
              chainId,
              memo,
            });
          }}
          pinkShadow
          size="big"
        >
          {t("stake_now")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default StakingModal;
