import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import { allNetworkKeys, getNetworkInfo } from "@src/utils/network_info";

import { NetworkGrid, SearchBar } from "./components";
import type { NetworkProps } from "./components/network_grid/config";
import { useNetworkHook } from "./components/network_grid/hooks";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const Networks = () => {
  const { t } = useTranslation("staking");
  const theme = useTheme();

  const {
    cosmosNetworks,
    elrondNetwork,
    ethereumNetwork,
    oasisNetwork,
    radixNetwork,
    solanaNetwork,
    suiNetwork,
  } = useNetworkHook();
  const allNetworkInfo: NetworkProps = {
    ...cosmosNetworks,
    ...elrondNetwork,
    ...ethereumNetwork,
    ...oasisNetwork,
    ...radixNetwork,
    ...solanaNetwork,
    ...suiNetwork,
  };
  const allNetworkData = allNetworkKeys
    .map((x: string | number) => getNetworkInfo(x))
    .filter(Boolean);

  const sortedNetworks = [...allNetworkData].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          "padding": theme.spacing(5, 3),
          "> .h3": {
            "fontWeight": 700,
            "fontSize": theme.spacing(3),
            "textAlign": "center",
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(5),
            },
            "> .h3": {
              fontWeight: 700,
              fontSize: theme.spacing(3),
              textAlign: "center",
              display: "inline",
              [theme.breakpoints.up("laptop")]: {
                fontSize: theme.spacing(5),
              },
            },
          },
          [theme.breakpoints.up("laptop")]: {
            "maxWidth": "1200px",
            "> .h3": {
              margin: "auto",
              width: "65%",
            },
          },
        }}
      >
        <Typography
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: "center",
            paddingBottom: theme.spacing(3),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
          variant="h4"
        >
          {t("stake with Forbole")}
        </Typography>
        <Trans
          components={[
            <Box
              className="h3"
              key="0"
              sx={{
                color: theme.palette.custom.forbole.indigo6,
              }}
            />,
            <Box
              className="h3"
              key="1"
              sx={{
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            />,
          ]}
          i18nKey="stake with Forbole title"
          ns="staking"
        />
        <Typography
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 400,
            fontSize: theme.spacing(2),
            textAlign: "center",
            padding: theme.spacing(3, 0, 3, 0),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontWeight: 400,
              fontSize: theme.spacing(3),
            },
          }}
          variant="body1"
        >
          {t("stake with Forbole desc")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <SearchBar sortedNetworks={sortedNetworks} />
          <NetworkGrid
            allNetworkInfo={allNetworkInfo}
            sortedNetworks={sortedNetworks}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Networks;
