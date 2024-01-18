import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { memo, useMemo } from "react";

import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const WhyForbole = () => {
  const { t } = useTranslation("staking");

  const reasons = useMemo(
    () => [
      {
        desc: t("reputable validator desc"),
        image: "/images/assets/image_journey.png",
        title: t("reputable validator"),
      },
      {
        desc: t("security focus desc"),
        image: "/images/assets/image_security.png",
        title: t("security focus"),
      },
      {
        desc: t("our future desc"),
        image: "/images/assets/image_future.png",
        title: t("our future"),
      },
    ],
    [t],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.whyForbole}>{t("why forbole?")}</span>
            <Trans
              components={[
                <span className={styles.tr0} key="0" />,
                <span className={styles.tr1} key="1" />,
              ]}
              i18nKey="why forbole title"
              ns="staking"
            />
            {reasons.map((reason, i) => (
              <div className={styles.reasonWrapper} key={i}>
                {reason?.image && (
                  <Image
                    alt=""
                    height="370"
                    objectFit="contain"
                    src={reason.image}
                    width="314"
                  />
                )}
                <div className={styles.reasonContent}>
                  <h4 className={styles.reasonTitle}>{reason.title}</h4>
                  <span className={styles.reasonDesc}>{reason.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WhyForbole);
