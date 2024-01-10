/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import LoadingSpinner from "@src/components/loading_spinner";
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

  const [isLoading, setIsLoading] = useState(false);
  const { selectedAccount, selectedAction } = stakingState;

  const [selectedNetwork, setSelectedNetwork] = useState<ChainId>(
    ChainId.CosmosHubTestnet,
  );

  const [networkInfo, setNetworkInfo] = useState<ModalNetworkInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [memo, setMemo] = useState("");

  const isOpen = !!selectedAccount && selectedAction === "stake";

  const amountNum = Number(amount);
  const isValidAmount = !Number.isNaN(amountNum);

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

      return () => {
        setAmount("");
        setAmountError("");
        setMemo("");
      };
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
              onChange={(e) => {
                if (amountError) {
                  setAmountError("");
                }

                setAmount(e.target.value);
              }}
              placeholder="0"
              {...(availableTokens && {
                rightText: availableTokens[1].toUpperCase(),
              })}
              onBlur={() => {
                const newAmountError = (() => {
                  if (!amount) return "";

                  if (!isValidAmount) {
                    return t("stakingModal.amountError.invalid");
                  }

                  if (amountNum <= 0) {
                    return t("stakingModal.amountError.positive");
                  }
                })() as string;

                setAmountError(newAmountError);
              }}
              value={amount}
            />{" "}
          </div>
          {!!amountError && <div className={styles.error}>{amountError}</div>}
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
          disabled={!!amountError}
          onClick={() => {
            if (
              !selectedAccount ||
              !networkInfo ||
              isLoading ||
              !isValidAmount ||
              !!amountError
            )
              return;

            const { address, chainId } = selectedAccount;

            setIsLoading(true);

            stakeAmount({
              address,
              amount,
              chainId,
              memo,
            }).finally(() => {
              setIsLoading(false);
            });
          }}
          pinkShadow
          size="big"
        >
          {isLoading ? <LoadingSpinner /> : t("stake_now")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default StakingModal;
