import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import * as commonStyles from "@src/screens/staking/common.module.scss";

import ContactCard from "./components/contact_card";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const ContactForbole = () => {
  const { t } = useTranslation("staking");

  return (
    <Box display="flex" justifyContent="center">
      <Box className={commonStyles.stakingContent}>
        <Typography className={commonStyles.stakingTitle} variant="h4">
          {t("contact Forbole")}
        </Typography>
        <Trans
          components={[
            <Box className={["h3", styles.tr0].join(" ")} key="0" />,
            <Box className={["h3", styles.tr1].join(" ")} key="1" />,
          ]}
          i18nKey="contact forbole title"
          ns="staking"
        />
        <Typography className={styles.contact} variant="body1">
          {t("contact Forbole desc")}
        </Typography>
        <ContactCard />
      </Box>
    </Box>
  );
};

export default ContactForbole;
