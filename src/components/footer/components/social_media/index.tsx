import { Box, Input, Stack, useTheme } from "@mui/material";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import { ToastContent, toast } from "react-toastify";
import validator from "validator";

import CtaButton from "@src/components/cta-button";
import { socialMedia } from "@utils/social_media_info";

import classes from "./classes.module.css";

const SocialMedia = () => {
  const socialKeys = ["github", "twitter", "telegram", "linkedIn", "Instagram"];
  const { locale } = useRouter();
  const socialMediaInfo = socialKeys.map((keyParam: string) => {
    let key = keyParam;
    if (key === "Instagram") {
      if (locale !== "en") {
        key += "_zh";
      }
    }
    return socialMedia[key] ?? {};
  });

  const { t } = useTranslation("common");
  const theme = useTheme();
  const [inputs, setInputs] = React.useState({
    email: "",
  });
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (validator.isEmail(inputs.email)) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((input) => ({
      ...input,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    if (!canSubmit) {
      toast.warn(t("send_email_warn") as ToastContent<unknown>);
      return;
    }

    if (event) {
      event.preventDefault();
      setLoading(true);
      axios
        .post("/api/subscribe", {
          inputs,
        })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              email: "",
            });
          }
          toast.success(t("thank") as ToastContent<unknown>);
          setLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setLoading(false);
          toast.error(t("common:error") as ToastContent<unknown>);
        });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column-reverse",
          alignItems: "center",
          gap: "32px",
        },
        [theme.breakpoints.up("laptop")]: {
          flexDirection: "row",
        },
      }}
    >
      <Box display="flex" gap="20px">
        {socialMediaInfo.map((x) => (
          <a
            key={x.key}
            className={classes.icon}
            href={x.url}
            rel="noreferrer"
            style={{ color: "currentcolor" }}
            target="_blank"
          >
            <x.component />
          </a>
        ))}
      </Box>
      {/* 输入框 */}
      <Stack className={classes.inpboxitem}>
        <Input
          className={classes.input}
          disableUnderline
          name="email"
          onInput={handleInputChange}
          placeholder={t("placeholder")}
          value={inputs.email}
        />
        <CtaButton loading={isLoading} onClick={handleSubmit}>
          {t("subscribe-us")}
        </CtaButton>
      </Stack>
    </Box>
  );
};

export default SocialMedia;
