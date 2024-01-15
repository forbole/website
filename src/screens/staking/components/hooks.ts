import type { Chain } from "@chain-registry/types";
import type { Window as KeplrWindow } from "@keplr-wallet/types";
import { useEffect, useRef, useState } from "react";

import { IS_E2E } from "@src/utils/e2e";

import {
  fetchNetworksInfo,
  getConnectedWallets,
  useStakingRef,
} from "../lib/context";
import { tryToConnectWallets } from "../lib/context/operations";
import { ChainId } from "../lib/context/types";

export const useCounter = (targetValue: unknown) => {
  const [counterValue, setCounterValue] = useState<unknown>(0);
  const counterRef = useRef(null);
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
        setCounterValue(0);

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
  }, [targetValue]);

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

declare global {
  interface Window extends KeplrWindow {}
}

/* eslint-disable no-console */
export const useInitStaking = () => {
  const [chainInfo, setChainInfo] = useState<Chain | null>(null);

  const stakingRef = useStakingRef();

  useEffect(() => {
    (async () => {
      // @TODO: hardcode this and just use in a testing script before deployment
      const { chains } = await import("chain-registry");

      console.log(
        "debug: index.tsx: chains",
        chains.filter((c) => c.chain_id.includes("dydx")),
      );

      const newChainInfo = chains.find(
        (chain) => chain.chain_id === ChainId.CosmosHubTestnet,
      );

      if (newChainInfo) {
        console.log("debug: index.tsx: newChainInfo", newChainInfo);
        setChainInfo(newChainInfo);
      }
    })();
  }, []);

  useEffect(() => {
    const connectedWallets = getConnectedWallets();

    fetchNetworksInfo(stakingRef.current.setState);

    tryToConnectWallets(
      stakingRef.current.state,
      stakingRef.current.setState,
      connectedWallets,
    ).then(() => {
      stakingRef.current.setState({
        hasInit: true,
      });
    });
  }, [stakingRef]);

  if (!chainInfo) return null;

  const rest = chainInfo.apis?.rest?.[0]?.address;
  const rpc = chainInfo.apis?.rpc?.[0]?.address;

  if (!rest || !rpc) return null;

  return null;
};
