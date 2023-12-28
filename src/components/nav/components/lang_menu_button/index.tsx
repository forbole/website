import { Box, Button, Menu, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { LangIcon } from "@src/components/icons";

import MenuList from "../menu_list";
import * as styles from "./index.module.scss";

const LangMenuButton = () => {
  const { lang, t } = useTranslation("common");
  const { asPath, locales } = useRouter();
  const [anchor, setAnchor] = useState<Element>();
  const theme = useTheme();
  const onClose = useCallback(() => setAnchor(undefined), [setAnchor]);

  useEffect(() => {
    onClose();
  }, [lang, onClose]);

  const localeToDisplay = {
    "en": t("en"),
    "zh-CN": t("zh-CN"),
    "zh-HK": t("zh-HK"),
  };

  const langText = (() => {
    switch (lang) {
      case "zh-HK":
        return "繁";
      case "zh-CN":
        return "简";
    }

    return "EN";
  })();

  const localesList = (locales as string[]).map((l) => ({
    icon: <LangIcon fill="currentColor" height={20} width={20} />,
    link: asPath,
    locale: l,
    name: localeToDisplay[l as keyof typeof localeToDisplay] || "",
  }));

  return (
    <>
      <Box className={styles.desktop}>
        <Button
          aria-label={langText.toUpperCase() || "language"}
          className={styles.navBarButton}
          onClick={(e) => setAnchor(e.currentTarget)}
          startIcon={
            <LangIcon
              fill={theme.palette.common.white}
              height={20}
              width={20}
            />
          }
        >
          <Typography className={styles.lang} component="span">
            {langText}
          </Typography>
        </Button>
        <Menu
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            className: styles.paper,
          }}
          anchorEl={anchor}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          id="basic-menu"
          keepMounted
          onClose={onClose}
          open={!!anchor}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <MenuList menuList={localesList} />
        </Menu>
      </Box>
      <MenuList className={styles.mobile} menuList={localesList} />
    </>
  );
};

export default LangMenuButton;
