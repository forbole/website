import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import * as commonStyles from "@src/screens/staking/common.module.scss";

import HowToCard from "./components/how_to_card";
import * as styles from "./index.module.scss";

const HowItWorks = () => {
  const { t } = useTranslation("staking");

  const howTos = useMemo(
    () => [
      {
        desc: t("trusted provider desc"),
        id: 1,
        image: "/images/assets/image_provider.png",
        title: t("trusted provider"),
      },
      {
        desc: t("stake desc"),
        id: 2,
        image: "/images/assets/image_stake.png",
        title: t("stake"),
      },
      {
        desc: t("rewards desc"),
        id: 3,
        image: "/images/assets/image_rewards.png",
        title: t("rewards"),
      },
      {
        desc: t("non-custodial desc"),
        id: 4,
        image: "/images/assets/image_non-custodial.png",
        title: t("non-custodial"),
      },
    ],
    [t],
  );

  return (
    <div className={styles.wrapper}>
      <div className={commonStyles.stakingContent}>
        <h4 className={commonStyles.stakingTitle}>{t("how it works")}</h4>
        <Trans
          components={[
            <div className={["h3", styles.h30].join(" ")} key="0" />,
            <div className={["h3", styles.h31].join(" ")} key="1" />,
          ]}
          i18nKey="how it works title"
          ns="staking"
        />
        <div className={styles.grid}>
          {howTos.map((howTo) => (
            <HowToCard
              desc={howTo.desc}
              id={howTo.id}
              image={howTo.image}
              key={howTo.id}
              title={howTo.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
