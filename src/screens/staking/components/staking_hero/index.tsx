import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

import CtaButton from "@src/components/cta-button";
import HighlightButton from "@src/components/highlight-button";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  fetchCoinPriceForNetwork,
  setSelectedAccount,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import {
  getAllAccounts,
  getAllRewards,
  getAllStaked,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import {
  accountHasRewards,
  filterOutTestnets,
  filterUniqueAddresses,
} from "@src/screens/staking/lib/staking_sdk/utils/accounts";

import * as styles from "./index.module.scss";

const defaultStake = 1000;
const defaultRewards = 10;

const StakingHero = () => {
  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const { hasInit } = stakingRef.current.state;

  useEffect(() => {
    if (hasInit) {
      const filteredAccounts = getAllAccounts(stakingRef.current.state).filter(
        filterUniqueAddresses(),
      );

      // Once it has init, fetch all coin prices for all the networks
      fetchCoinPriceForNetwork(
        stakingRef.current,
        filteredAccounts.map((a) => a.networkId),
      );
    }
  }, [hasInit, stakingRef]);

  if (!hasInit) return null;

  const accounts = getAllAccounts(stakingRef.current.state).filter(
    filterOutTestnets,
  );

  const accountsWithRewards = accounts.filter(accountHasRewards);

  const stakedDisplayed = accounts.length
    ? getAllStaked(stakingRef.current.state, accounts)
    : defaultStake;

  const rewardsDisplayed = accounts.length
    ? getAllRewards(stakingRef.current.state, accountsWithRewards)
    : defaultRewards;

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentCta}>
        <div className={styles.title}>
          <Trans
            components={[<span className={styles.highlight} key="0" />]}
            i18nKey="stakingHero.title"
            ns="staking"
          />
        </div>
        <div className={styles.desc}>{t("stakingHero.desc")}</div>
        <div className={styles.buttons}>
          <HighlightButton
            className={styles.stakeButton}
            onClick={() => {
              if (!accounts?.length) {
                setSelectedAccount(stakingRef.current, "connect_wallet", null);

                return;
              }

              setSelectedAccount(stakingRef.current, "stake", accounts[0]);
            }}
            size="big"
          >
            {accounts.length
              ? t("stakingHero.stake")
              : t("stakingHero.connectWallet")}
          </HighlightButton>
          {!!accountsWithRewards.length ? (
            <CtaButton
              className={styles.claimRewards}
              onClick={() => {
                setSelectedAccount(
                  stakingRef.current,
                  "claim_rewards",
                  accounts[0],
                );
              }}
            >
              {t("stakingHero.claimRewards")}
            </CtaButton>
          ) : (
            <div className={[styles.claimRewards, styles.noShadow].join(" ")} />
          )}
        </div>
      </div>
      <div className={styles.contentStats}>
        <div>
          <div className={styles.statLabel}>{t("stakingHero.totalStake")}</div>
          <div className={styles.amount}>
            <span>{stakedDisplayed.toFixed(1)}</span> USD
          </div>
        </div>
        <div>
          <div className={styles.statLabel}>
            {t("stakingHero.totalRewards")}
          </div>
          <div className={styles.amount}>
            <span>
              {(() => {
                const min = 0.1;

                if (rewardsDisplayed && rewardsDisplayed < min) {
                  return `<${min.toFixed(1)}`;
                }

                return rewardsDisplayed.toFixed(1);
              })()}
            </span>{" "}
            USD
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingHero;
