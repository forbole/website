/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";

import {
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/context";

import ModalBase from "./modal_base";

const ConnectWalletModal = () => {
  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const { selectedAction } = stakingRef.current.state;

  const isOpen = selectedAction === "connect_wallet";

  const { setState: setStakingState } = stakingRef.current;

  if (!isOpen) return null;

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("connectWallet.title")}
    >
      <div>Connect Wallet</div>
    </ModalBase>
  );
};

export default ConnectWalletModal;
