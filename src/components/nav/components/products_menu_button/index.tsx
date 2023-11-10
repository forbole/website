import { useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import { anchorElState } from "@src/recoil/settings/anchorEl";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRecoilState } from "recoil";

const ProductsMenuButton = () => {
  const { t } = useTranslation("common");

  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  const [, setAnchorEl] = useRecoilState(anchorElState);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuProductsList = [
    {
      name: "validator-infrastructure",
      link: "/infrastructure",
    },
    {
      name: "native-staking-service",
      link: "/staking-service",
    },
    {
      name: "blockchain-data-analytics-tools",
      link: "/analytics-tools",
    },
    {
      name: "developer-tools",
      link: "/developer-tools",
    },
    {
      name: "enterprise-solution",
      link: "/enterprise-solution",
    },
    {
      name: "forbole-academy",
      link: "#!",
    },
  ];

  return onlyLargeScreen ? (
    <List component="div" disablePadding>
      {menuProductsList?.map((l, i) => (
        <div key={i}>
          <Link href={l.link} passHref>
            <MenuItem
              component="a"
              sx={{
                display: "flex",
                // color: theme.palette.common.white,
                padding: "0px 32px",
                justifyContent: "flex-start",
                fontSize: theme.spacing(2),
                fontWeight: 700,
                height: theme.spacing(7),
                // padding: theme.spacing(0, 3),
                filter: l.link !== "#!" ? "" : "opacity(0.1)",
                color: theme.palette.custom.forbole.indigo,
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
              {t(l.name)}
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
        <Link href={l.link} passHref key={i}>
          <MenuItem
            onClick={handleClose}
            component="a"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: theme.spacing(2),
              fontWeight: 700,
              height: theme.spacing(7),
              padding: theme.spacing(0, 4),
              filter: l.link !== "#!" ? "" : "opacity(0.1)",
              color: theme.palette.custom.forbole.indigo,
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
            {t(l.name)}
          </MenuItem>
        </Link>
      ))}
    </List>
  );
};

export default ProductsMenuButton;
