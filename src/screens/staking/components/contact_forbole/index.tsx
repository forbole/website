import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { memo } from "react";

import * as commonStyles from "@src/screens/staking/common.module.scss";

import ContactCard from "./components/contact_card";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const ContactForbole = () => {
  const { t } = useTranslation("staking");

  return (
    <div className={styles.wrapper}>
      <div className={commonStyles.stakingContent}>
        <h4 className={commonStyles.stakingTitle}>{t("contact Forbole")}</h4>
        <Trans
          components={[
            <div className={["h3", styles.tr0].join(" ")} key="0" />,
            <div className={["h3", styles.tr1].join(" ")} key="1" />,
          ]}
          i18nKey="contact forbole title"
          ns="staking"
        />
        <h4 className={styles.contact}>{t("contact Forbole desc")}</h4>
        <ContactCard />
      </div>
    </div>
  );
};

export default memo(ContactForbole);
