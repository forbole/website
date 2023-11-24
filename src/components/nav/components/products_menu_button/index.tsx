import { useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { anchorElState } from "@src/recoil/settings/anchorEl";

const ProductsMenuButton = () => {
  const { t } = useTranslation("common");

  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  const [, setAnchorEl] = useRecoilState(anchorElState);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuProductsList = useMemo(
    () => [
      {
        name: t("validator-infrastructure"),
        link: "/infrastructure",
      },
      {
        name: t("native-staking-service"),
        link: "/staking-service",
      },
      {
        name: t("blockchain-data-analytics-tools"),
        link: "/analytics-tools",
      },
      {
        name: t("developer-tools"),
        link: "/developer-tools",
      },
      {
        name: t("enterprise-solution"),
        link: "/enterprise-solution",
      },
    ],
    [t],
  );

  return onlyLargeScreen ? (
    <List component="div" disablePadding>
      {menuProductsList?.map((l, i) => (
        <div key={i}>
          <Link href={l.link} style={{ textDecoration: "none" }}>
            <MenuItem
              component="span"
              sx={{
                "display": "flex",
                "padding": "0px 32px",
                "justifyContent": "flex-start",
                "fontSize": theme.spacing(2),
                "fontWeight": 700,
                "height": theme.spacing(7),
                "filter": l.link !== "#!" ? "" : "opacity(0.1)",
                "color": theme.palette.custom.forbole.indigo,
                "> a": {
                  width: "100%",
                  textAlign: "left",
                  textDecoration: "none",
                },
                "&:hover": {
                  color: theme.palette.common.white,
                  background: "linear-gradient(to right,#623DF5,#362187)",
                },
              }}
            >
              {l.name}
            </MenuItem>
          </Link>
        </div>
      ))}
    </List>
  ) : (
    <List
      component="div"
      disablePadding
      sx={{ background: "rgba(107, 97, 254, 0.24)" }}
    >
      {menuProductsList?.map((l, i) => (
        <Link href={l.link} key={i} style={{ textDecoration: "none" }}>
          <MenuItem
            component="span"
            onClick={handleClose}
            sx={{
              "display": "flex",
              "justifyContent": "flex-start",
              "fontSize": theme.spacing(2),
              "fontWeight": 700,
              "height": theme.spacing(7),
              "padding": theme.spacing(0, 4),
              "filter": l.link !== "#!" ? "" : "opacity(0.1)",
              "color": theme.palette.custom.forbole.indigo,
              "> a": {
                width: "100%",
                textAlign: "left",
                textDecoration: "none",
              },
              "&:hover": {
                color: theme.palette.common.white,
                background: "linear-gradient(to right,#623DF5,#362187)",
              },
            }}
          >
            {l.name}
          </MenuItem>
        </Link>
      ))}
    </List>
  );
};

export default ProductsMenuButton;
