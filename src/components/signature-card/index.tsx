import { Grid } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import * as styles from "./index.module.scss";

function SignatureCard() {
  const { t } = useTranslation("developer_tools");

  const data = useMemo(
    () => [
      {
        active: true,
        desc: t("rpc"),
        title: t("websocket_service"),
      },
      {
        active: false,
        desc: t("rpc"),
        title: t("archive_node"),
      },
      {
        active: false,
        desc: t("rpc_api_graphql"),
        title: t("extra_chain"),
      },
    ],
    [t],
  );

  return (
    <Grid
      columnSpacing={{ laptop: "16px", mobile: "0" }}
      container
      rowSpacing={{ laptop: "0", mobile: "16px" }}
    >
      {data.map((d, k) => (
        <Grid item key={k} laptop={4} mobile={12}>
          <div className={styles.gridContent}>
            <div style={{ width: "100%" }}>
              <p className={styles.title}>{d.title}</p>
              <div className={styles.descContainer}>
                <img
                  alt=""
                  src="/images/assets/25.svg"
                  style={{ height: "40px", width: "20px" }}
                />
                <div>
                  <p className={styles.desc}>{d.desc}</p>
                </div>
              </div>
            </div>
            {d.active && (
              <div className={styles.activeSection}>
                <img alt="√" src="/images/assets/26.svg" />
                <p className={styles.usage}>{t("unlimited_usage")}</p>
              </div>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default SignatureCard;
