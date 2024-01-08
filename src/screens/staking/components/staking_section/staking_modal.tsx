/* eslint-disable no-console */
import type { MsgDelegateEncodeObject, StdFee } from "@cosmjs/stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Modal } from "@mui/material";
import { MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { useContext, useEffect, useState } from "react";

import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";

import { stakingClient } from "./utils/staking_client";

type ModalNetworkInfo = {
  rpc: string;
};

const StakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;

  const [availableTokens, setAvailableTokens] = useState<
    [string, string] | null
  >(null);

  const [networkInfo, setNetworkInfo] = useState<ModalNetworkInfo | null>(null);

  const isOpen = !!selectedAccount && selectedAction === "stake";

  useEffect(() => {
    if (isOpen) {
      setAvailableTokens(null);
      setNetworkInfo(null);

      const { address, chainId } = selectedAccount;

      stakingClient.getAddressInfo(chainId, address).then((info) => {
        setAvailableTokens([info.balances.amount, info.balances.denom]);
      });

      stakingClient.getStakingInfo(chainId).then((info) => {
        if (!info.rpc) {
          return;
        }

        setNetworkInfo({ rpc: info.rpc });
      });
    }
  }, [isOpen, selectedAccount]);

  if (!open) return null;

  return (
    <Modal
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      slotProps={{
        backdrop: {
          sx() {
            return {
              backdropFilter: "blur(8px)",
              background: "rgba(123, 123, 123, 0.20)",
            };
          },
        },
      }}
      sx={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div>Stake with Forbole</div>
        {availableTokens && (
          <div>
            Available: {availableTokens[0]} {availableTokens[1].toUpperCase()}
          </div>
        )}
        <div>
          <div>Token amount</div>
          <input /> {availableTokens && availableTokens[1].toUpperCase()}
        </div>
        <div>
          <button
            onClick={() => {
              if (!selectedAccount || !networkInfo) return;

              const { address, chainId } = selectedAccount;

              stakingClient.stake(chainId, address, "1").then(async (info) => {
                const message = info.tx.body.messages[0];

                if (!message) return;

                const msg = MsgDelegate.fromPartial({
                  amount: message.amount,
                  delegatorAddress: message.delegator_address,
                  validatorAddress: message.validator_address,
                });

                const msgAny: MsgDelegateEncodeObject = {
                  typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                  value: msg,
                };

                const fee: StdFee = {
                  amount: info.tx.authInfo.fee.amount,
                  gas: info.tx.authInfo.fee.gas_limit,
                };

                const memo = info.tx.body.memo || "";

                const offlineSigner =
                  window.keplr?.getOfflineSignerOnlyAmino(chainId);

                if (!offlineSigner) {
                  throw new Error("Can't get offline signer");
                }

                const client = await SigningStargateClient.connectWithSigner(
                  networkInfo.rpc,
                  offlineSigner,
                );

                client
                  .sign(address, [msgAny], fee, memo)
                  .then((signed) => {
                    console.log("debug: index.tsx: signed", signed);
                  })
                  .catch((err) => {
                    console.log("debug: index.tsx: err", err);
                  });
              });
            }}
          >
            Stake Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StakingModal;
