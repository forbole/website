/* eslint-disable react/require-default-props */
import { Box, Button, Container, Input, Stack, useTheme } from "@mui/material";
import CtaButton from "@src/components/cta-button";
import { getSocialMediaInfo } from "@utils/social_media_info";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ToastContent, toast } from "react-toastify";
import validator from "validator";

import classes from "./classes.module.css";
import { socialKeys } from "./config";

const SocialMedia = () => {
  const socialMediaInfo = socialKeys.map((x) => getSocialMediaInfo(x));
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
  }, [inputs]);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((input) => ({
      ...input,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    if (!canSubmit)
      return toast.warn(t("send_email_warn") as ToastContent<unknown>);
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
          toast.error(t("error") as ToastContent<unknown>);
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
        {socialMediaInfo.map((x) => {
          return (
            <a
              key={x.key}
              href={x.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "currentcolor" }}
            >
              <x.component />
            </a>
          );
        })}
      </Box>
      {/* 输入框 */}
      <Stack className={classes.inpboxitem}>
        <Input
          className={classes.input}
          placeholder={t("placeholder")}
          disableUnderline
          value={inputs.email}
          name="email"
          onInput={handleInputChange}
        />
        <CtaButton onClick={handleSubmit} loading={isLoading}>
          {t("subscribe-us")}
        </CtaButton>
      </Stack>
    </Box>
  );
};

export default SocialMedia;
