import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo } from "react";

import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import { fetchCoinPriceForNetwork } from "@src/screens/staking/lib/staking_sdk/context/actions";
import type { NetworkClaimableRewards } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import {
  getClaimableRewardsForNetwork,
  getStakeAccountsForNetwork,
  getStakedDataForNetwork,
  getUnbondingTokensForNetwork,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import { networkKeyToNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import type { Coin } from "@src/screens/staking/lib/staking_sdk/core/base";
import { WalletId } from "@src/screens/staking/lib/staking_sdk/core/base";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import type { StakeAccount } from "@src/screens/staking/lib/staking_sdk/staking_client_types";
import { getExplorerLink } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import type { Network, NetworkKey } from "@src/utils/network_info";

import * as styles from "./stake_accounts.module.scss";

type Props = {
  network: Network;
  onClose: () => void;
};

const StakeAccounts = ({ network, onClose }: Props) => {
  const stakingNetworkId = networkKeyToNetworkId[network.key as NetworkKey];

  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const { stakeAccounts } = useMemo(() => {
    const wallet = WalletId.Keplr;

    const result = {
      claimableRewards: null as NetworkClaimableRewards | null,
      stakeAccounts: null as null | StakeAccount[],
      stakedData: null as Coin | null,
      unbondingTokens: null as { period: string; text: string } | null,
    };

    if (!!stakingNetworkId && !!wallet) {
      result.stakeAccounts = getStakeAccountsForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );

      result.stakedData = getStakedDataForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );

      result.claimableRewards =
        getClaimableRewardsForNetwork(
          stakingRef.current.state,
          stakingNetworkId,
        ) || null;

      const unbonding = getUnbondingTokensForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );

      if (unbonding) {
        result.unbondingTokens = {
          period: unbonding.period
            ? new Date(Number(unbonding.period) * 1000).toLocaleString()
            : "",
          text: formatCoin(unbonding.coin, { decimals: 4 }),
        };
      }
    }

    return result;
  }, [stakingNetworkId, stakingRef]);

  useEffect(() => {
    fetchCoinPriceForNetwork(stakingRef.current, stakingNetworkId);
  }, [stakingRef, stakingNetworkId]);

  return (
    <div>
      <div>
        <button onClick={onClose}>{"<"}</button> {t("accounts")}{" "}
        {stakeAccounts?.length}
      </div>
      <div>
        {stakeAccounts?.map((account) => {
          const shortenedAddress = `${account.address.slice(0, 8)}...`;

          const explorerLink = getExplorerLink(
            account.address,
            stakingNetworkId,
          );

          const statusLabel =
            {
              activating: t("stakeAccount.status.activating"),
              active: t("stakeAccount.status.active"),
              deactivating: t("stakeAccount.status.deactivating"),
            }[account.status] || account.status;

          const statusStyle =
            {
              activating: styles.statusActivating,
              active: styles.statusActive,
              deactivating: styles.statusDeactivating,
            }[account.status] || null;

          return (
            <div className={styles.stakeAccount} key={account.address}>
              <div className={styles.left}>
                <div className={styles.title}>
                  <img
                    alt=""
                    className={styles.stakeIcon}
                    src="/icons/stake_account.svg"
                  />
                  <span>{shortenedAddress}</span>
                  {!!explorerLink && (
                    <>
                      {" "}
                      <a
                        className={styles.external}
                        href={explorerLink}
                        target="_blank"
                      >
                        <img alt="" src="/icons/external.svg" />
                      </a>
                    </>
                  )}
                </div>
                <div className={styles.status}>
                  {!!statusStyle && (
                    <span className={statusStyle}>{statusLabel}</span>
                  )}
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={styles.value}>{formatCoin(account)}</div>
                <div className={styles.extra}>+123</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StakeAccounts;
