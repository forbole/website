import { LangIcon } from "@icons";
import {
  Box,
  Button,
  List,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

import { useWindowDimensions } from "@src/hooks";
import useColor from "@src/styles/useColor";
import { anchorElContext } from "@src/utils/menu";

import useStyles from "./useStyles";

const LangMenuButton = () => {
  const { t, lang } = useTranslation("common");
  const { locales, pathname, query } = useRouter();
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const [anchor, setAnchor] = React.useState<Element>();
  const theme = useTheme();
  const { setAnchorEl } = useContext(anchorElContext);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor]);

  React.useEffect(() => {
    onClose();
  }, [lang, onClose]);

  const colors = useColor();
  const localeToDisplay = {
    "en": t("en"),
    "zh-HK": t("zh-HK"),
    "zh-CN": t("zh-CN"),
  };

  let lan = "";
  switch (lang) {
    case "en":
      lan = "EN";
      break;
    case "zh-HK":
      lan = "繁";
      break;
    case "zh-CN":
      lan = "简";
      break;
    default:
      lan = "EN";
      break;
  }

  return (
    <>
      <Box css={styles.desktop}>
        <Button
          aria-label={lan?.toUpperCase() || "language"}
          css={styles.navBarButton}
          onClick={(e) => setAnchor(e.currentTarget)}
          startIcon={
            <LangIcon
              fill={theme.palette.common.white}
              height={20}
              width={20}
            />
          }
        >
          <Typography component="span" style={{ color: colors.primary }}>
            {lan}
          </Typography>
        </Button>
        <Menu
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            sx: {
              backgroundImage: "none",
              borderRadius: theme.spacing(3),
              width: theme.spacing(27.5),
              top: `${theme.spacing(9)} !important` as any,
              right: `${width - width / 4}px!important` as any,
              background: "rgba(255, 255, 255)",
              boxShadow:
                "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
            },
          }}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          id="basic-menu"
          keepMounted
          onClose={onClose}
          open={!!anchor}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {locales?.map((l) => (
            <div key={l}>
              <Link
                href={{ pathname, query }}
                locale={l}
                prefetch={false}
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem
                  component="span"
                  sx={{
                    "color": theme.palette.custom.forbole.indigo,
                    "display": "flex",
                    "fontSize": theme.spacing(2),
                    "fontWeight": 700,
                    "gap": "8px",
                    "height": theme.spacing(7),
                    "justifyContent": "flex-start",
                    "padding": theme.spacing(0, 4),

                    "> a": {
                      width: "100%",
                      textAlign: "left",
                    },
                    "&:hover": {
                      background: "linear-gradient(to right,#623DF5,#362187)",
                      color: theme.palette.common.white,
                    },
                  }}
                >
                  <LangIcon fill="currentColor" height={20} width={20} />
                  {localeToDisplay[l as keyof typeof localeToDisplay]}
                </MenuItem>
              </Link>
            </div>
          ))}
        </Menu>
      </Box>
      <List
        component="div"
        css={styles.mobile}
        disablePadding
        sx={{ background: "rgba(107, 97, 254, 0.24)" }}
      >
        {locales?.map((l) => (
          <div key={l} style={{ display: lang !== l ? "block" : "none" }}>
            <Link
              href={{ pathname, query }}
              locale={l}
              style={{
                textDecoration: "none",
              }}
            >
              <MenuItem
                component="span"
                onClick={handleClose}
                sx={{
                  "color": theme.palette.custom.forbole.indigo,
                  "display": "flex",
                  "fontSize": theme.spacing(2),
                  "fontWeight": 700,
                  "gap": "8px",
                  "height": theme.spacing(7),
                  "justifyContent": "flex-start",
                  "padding": theme.spacing(0, 4),

                  "> a": {
                    width: "100%",
                    textAlign: "left",
                  },
                  "&:hover": {
                    color: theme.palette.common.white,
                    background: "linear-gradient(to right,#623DF5,#362187)",
                  },
                }}
              >
                <LangIcon fill="currentColor" height={20} width={20} />
                {localeToDisplay[l as keyof typeof localeToDisplay]}
              </MenuItem>
            </Link>
          </div>
        ))}
      </List>
    </>
  );
};

export default LangMenuButton;
