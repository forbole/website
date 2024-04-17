import type { Window as KeplrWindow } from "@keplr-wallet/types";
import type { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";

import { InfoButton, toastInfo } from "@src/components/notification";
import type { TStakingContext } from "@src/screens/staking/lib/staking_sdk/context";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  fetchNetworksInfo,
  setSelectedAccount,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import {
  getConnectedWallets,
  getSolanaWithdrawNotified,
  setSolanaWithdrawNotified,
} from "@src/screens/staking/lib/staking_sdk/utils/storage";
import { tryToConnectWallets } from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { IS_E2E } from "@src/utils/e2e";

import { getAccountsForNetwork } from "../lib/staking_sdk/context/selectors";
import { solanaNetworks } from "../lib/staking_sdk/core/solana";

export const useCounter = (targetValue: unknown) => {
  const [counterValue, setCounterValue] = useState<unknown>(0);
  const counterRef = useRef(null);
  const counterValueRef = useRef<unknown>(0);

  counterValueRef.current = counterValue;

  const divisor = useRef<null | number>(null);
  const intervalId = useRef<null | number>(null);
  const hasViewed = useRef<unknown>(false);

  const clearInterval = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }

    intervalId.current = null;
  };

  useEffect(() => {
    const init = () => {
      if (hasViewed.current === targetValue) return;

      if (typeof targetValue === "number" && !IS_E2E) {
        if (
          typeof counterValueRef.current !== "number" ||
          targetValue < counterValueRef.current
        ) {
          setCounterValue(0);
        }

        divisor.current = targetValue * (targetValue > 100 ? 0.01 : 0.006);

        clearInterval();

        let pending = false;

        intervalId.current = window.setInterval(() => {
          if (pending) return;

          pending = true;

          window.requestAnimationFrame(() => {
            pending = false;

            setCounterValue((prev: unknown) => {
              if (
                typeof prev !== "number" ||
                typeof divisor.current !== "number"
              )
                return prev;

              const newValue = prev + divisor.current;

              if (newValue >= targetValue) {
                clearInterval();

                return targetValue;
              }

              return newValue;
            });
          });
        });
      } else {
        setCounterValue(targetValue);
      }
    };

    if (typeof IntersectionObserver === "undefined" || !counterRef?.current) {
      init();

      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        init();
        hasViewed.current = targetValue;
      }
    });

    observer.observe(counterRef?.current);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, counterValueRef]);

  useEffect(
    () => () => {
      clearInterval();
    },
    [],
  );

  return {
    counterRef,
    counterValue,
  };
};

const notifySolanaUnstake = (context: TStakingContext, t: Translate) => {
  const { state } = context;

  const hasNotified = getSolanaWithdrawNotified();

  if (hasNotified) return;

  // Find the first case where there is an inactive stake account and display a
  // toast for that case. In production there is only mainnet.
  [...Array.from(solanaNetworks)].some((network) => {
    const accounts = getAccountsForNetwork(state, network);

    return accounts.some((account) => {
      const inactiveStakeAccounts = account.info?.stakeAccounts?.filter(
        (a) => a.status === "inactive",
      );

      if (!inactiveStakeAccounts?.length) return false;

      setSolanaWithdrawNotified();

      toastInfo({
        subtitle: (
          <InfoButton
            onClick={() => {
              setSelectedAccount(context, "withdraw_unstake", account);
            }}
          >
            {t("staking:solanaUnstakeIsReady.subtitle")}
          </InfoButton>
        ),
        title: t("staking:solanaUnstakeIsReady.title"),
      });

      return true;
    });
  });
};

declare global {
  interface Window extends KeplrWindow {
    leap: KeplrWindow["keplr"];
    phantom:
      | { solana?: { connect: () => Promise<any>; isPhantom: boolean } }
      | undefined;
    solflare: { isSolflare: boolean } | undefined;
    stakingContext: TStakingContext | undefined;
  }
}

export const useInitStaking = () => {
  const stakingRef = useStakingRef();
  const { t } = useTranslation();

  useEffect(() => {
    const connectedWallets = getConnectedWallets();

    fetchNetworksInfo(stakingRef.current);

    tryToConnectWallets(stakingRef.current, connectedWallets).then(() => {
      stakingRef.current.setState({
        hasInit: true,
      });
    });
  }, [stakingRef]);

  // This is called once after init when all the connected accounts data is
  // available
  useEffect(() => {
    notifySolanaUnstake(stakingRef.current, t);
  }, [stakingRef.current.state.hasInit, stakingRef, t]);

  return null;
};
