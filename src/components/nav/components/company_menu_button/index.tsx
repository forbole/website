import { useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import { anchorElState } from "@src/recoil/settings/anchorEl";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";

const CompanyMenuButton = () => {
  const { t } = useTranslation("common");

  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const [, setAnchorEl] = useRecoilState(anchorElState);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuCompanyList = [
    {
      name: "about",
      link: "/about",
    },
    {
      name: "blog",
      link: "/blog",
    },
    {
      name: "contact",
      link: "/contact",
    },
  ];

  return onlyLargeScreen ? (
    <List component="div" disablePadding>
      {menuCompanyList?.map((l, i) => (
        <div key={i}>
          <Link href={l.link} passHref>
            <MenuItem
              component="a"
              sx={{
                "display": "flex",
                // color: theme.palette.common.white,
                "filter": l.link ? "" : "opacity(0.1)",
                "width": "220px",
                "color": theme.palette.custom.forbole.indigo,
                "padding": "0px 32px",
                "justifyContent": "flex-start",
                "fontSize": theme.spacing(2),
                "fontWeight": 700,
                "height": theme.spacing(7),
                // padding: theme.spacing(0, 3),
                "> a": {
                  width: "100%",
                  textAlign: "left",
                  textDecoration: "none",
                },
                "&:hover": {
                  color: theme.palette.common.white,
                  // backgroundColor: theme.palette.custom.forbole.indigo,
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
      {menuCompanyList?.map((l, i) => (
        <div key={i}>
          <Link href={l.link} passHref>
            <MenuItem
              component="a"
              onClick={handleClose}
              sx={{
                "display": "flex",
                "justifyContent": "flex-start",
                "fontSize": theme.spacing(2),
                "fontWeight": 700,
                "height": theme.spacing(7),
                "padding": theme.spacing(0, 4),
                "color": theme.palette.custom.forbole.indigo,
                "filter": l.link ? "" : "opacity(0.1)",
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
  );
};

export default CompanyMenuButton;
