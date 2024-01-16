/* eslint-disable no-console */
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import { tryToConnectWallets } from "@src/screens/staking/lib/staking_sdk/operations";
import { WalletId } from "@src/screens/staking/lib/staking_sdk/types";
import {
  getWalletName,
  walletsIcons,
} from "@src/screens/staking/lib/wallet_info";

import * as styles from "./connect_wallet_modal.module.scss";
import ModalBase from "./modal_base";

const ConnectWalletModal = () => {
  const stakingRef = useStakingRef();
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("staking");

  const { selectedAction } = stakingRef.current.state;

  const isOpen = selectedAction === "connect_wallet";

  const { setState: setStakingState } = stakingRef.current;

  if (!isOpen) return null;

  const onClose = () => {
    setStakingState({ selectedAction: null });
  };

  return (
    <ModalBase onClose={onClose} open={isOpen} title={t("connectWallet.title")}>
      <p className={styles.intro}>{t("connectWallet.intro")}</p>
      {isLoading ? (
        <LoadingSpinner className={styles.loading} />
      ) : (
        <div className={styles.wallets}>
          {([WalletId.Keplr] as WalletId[]).map((walletId) => {
            const WalletIcon = walletsIcons[walletId];
            const walletName = getWalletName(walletId, t);

            return (
              <button
                className={styles.wallet}
                key={walletId}
                onClick={() => {
                  setIsLoading(true);

                  tryToConnectWallets(
                    stakingRef.current.state,
                    stakingRef.current.setState,
                    [walletId],
                  )
                    .then((connected) => {
                      if (connected) {
                        toastSuccess({
                          subtitle: t("connectWallet.success.subtitle"),
                          title: t("connectWallet.success.title"),
                        });

                        onClose();
                      }
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
              >
                <div className={styles.icon}>
                  <WalletIcon />
                </div>
                <div className={styles.name}>{walletName}</div>
              </button>
            );
          })}
        </div>
      )}
      <Trans
        components={[
          <p className={styles.notice} key="1" />,
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            className={styles.link}
            href="https://forbole.com/terms-and-conditions"
            key="2"
            target="_blank"
          />,
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            className={styles.link}
            href="https://forbole.com/privacy-policy"
            key="3"
            target="_blank"
          />,
        ]}
        i18nKey="notice"
        ns="staking"
      />
    </ModalBase>
  );
};

export default ConnectWalletModal;
