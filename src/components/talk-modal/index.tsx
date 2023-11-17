import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useRef } from "react";

import CtaButton from "../cta-button";
import FormInput from "../formInput";
import { Close } from "../icons";

interface Props {
  close?: (b: boolean) => void;
  staking?: any;
  open?: boolean;
  inputs: {
    "name": string;
    "email": string;
    "company": string;
    "telegram": string;
    "agree": boolean;
    "specify": string;
    "Data API": boolean;
    "GraphQL": boolean;
    "Other": boolean;
    "RPC Endpoints": boolean;
  };
  handleInputChange: (event: any) => void;
  handleCheckedChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  handleClear: (field: any) => void;
  canSubmit: boolean;
  isLoading: boolean;
}
const TalkModal = ({
  close,
  staking,
  open = false,
  inputs,
  handleInputChange,
  handleSubmit,
  handleClear,
  canSubmit,
  handleCheckedChange,
  isLoading,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("developer_tools");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleToggle = (e: any) => {
    const { name, checked } = e.target;
    if (name === "Other") {
      if (checked) {
        setTimeout(() => {
          inputRef.current?.querySelector("input")?.focus();
        }, 100);
      } else {
        handleClear("specify");
      }
    }
    handleCheckedChange(e);
  };
  const selectList = useMemo(
    () =>
      [
        { label: t("item_1"), name: "RPC Endpoints" },
        { label: t("item_2"), name: "GraphQL" },
        { label: t("item_3"), name: "Data API" },
        { label: t("item_4"), name: "Other" },
      ] as const,
    [t],
  );

  return (
    <Modal
      onClose={() => close?.(false)}
      open={open}
      slotProps={{
        backdrop: {
          sx() {
            return {
              background: "rgba(123, 123, 123, 0.20)",
              backdropFilter: "blur(8px)",
            };
          },
        },
      }}
      sx={{
        overflow: "auto",
      }}
    >
      <Stack
        sx={{
          width: "1000px",
          padding: "64px",
          gap: staking ? "24px" : "40px",
          borderRadius: "24px",
          margin: "164px auto",
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.64) 64.58%, #FFF 100%)",
          boxShadow:
            "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
          color: "#202A43",
          [theme.breakpoints.down("laptop")]: {
            padding: "24px",
            width: "343px",
            gap: "24px",
            mt: "104px",
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: 590,
                mb: "8px",
                [theme.breakpoints.down("laptop")]: {
                  fontSize: "18px",
                  mb: "15px",
                },
              }}
            >
              {t("form_title")}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 300,
              }}
            >
              {t("form_desc")}
            </Typography>
          </Stack>
          {close && (
            <Close
              onClick={() => close?.(false)}
              style={{
                flexShrink: "0",
                border: "8px solid transparent",
                boxSizing: "content-box",
              }}
            />
          )}
        </Stack>
        <Grid
          container
          spacing={{ mobile: theme.spacing(3), desktop: theme.spacing(4) }}
        >
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
              }}
            >
              {t("label_name")}
              <span style={{ color: "#FF426B" }}>*</span>
            </Typography>
            <FormInput
              name="name"
              onInput={handleInputChange}
              placeholder={t("name")}
              value={inputs.name}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
              }}
            >
              {t("label_company")}
            </Typography>
            <FormInput
              name="company"
              onInput={handleInputChange}
              placeholder={t("Company")}
              value={inputs.company}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
              }}
            >
              {t("label_email")}
              <span style={{ color: "#FF426B" }}>*</span>
            </Typography>
            <FormInput
              name="email"
              onInput={handleInputChange}
              placeholder={t("Email")}
              type="email"
              value={inputs.email}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
              }}
            >
              {t("label_telegram")}
            </Typography>
            <FormInput
              name="telegram"
              onInput={handleInputChange}
              placeholder={t("Telegram")}
              value={inputs.telegram}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
                mb: "16px",
              }}
            >
              {t("get_start")}
              <span style={{ color: "#FF426B" }}>*</span>
            </Typography>
            <List
              dense
              sx={{
                width: "100%",
                borderRadius: "8px",
                boxShadow:
                  "0px 10px 32px -4px rgba(96, 60, 238, 0.10), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
                overflow: "hidden",
                py: 0,
              }}
            >
              {selectList.map((value) => (
                <ListItem
                  key={value.label}
                  sx={{
                    bgcolor: "#ffffff",
                    borderBottom: "2px solid rgba(96, 60, 238, 0.28)",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inputs[value.name]}
                        name={value.name}
                        onChange={handleToggle}
                        sx={{
                          "py": "0",
                          "color": "#AFAFAF",
                          "&.Mui-checked": {
                            color: "#EE3131",
                          },
                        }}
                        value={value.name}
                      />
                    }
                    id={value.label}
                    label={value.label}
                    labelPlacement="start"
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      m: 0,
                      p: "12px 0",
                      fontSize: "16px",
                      lineHeight: "30px",
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                disablePadding
                sx={{
                  "width": "auto",
                  "&:last-child": { borderBottom: "0" },
                  "bgcolor": "#ffffff",
                  "borderBottom": "2px solid rgba(96, 60, 238, 0.28)",
                }}
              >
                <Input
                  ref={inputRef}
                  disabled={!inputs.Other}
                  disableUnderline
                  fullWidth
                  name="specify"
                  onInput={handleInputChange}
                  placeholder={t("item_5")}
                  sx={{
                    p: "12px",
                    fontSize: "16px",
                    lineHeight: "30px",
                    color: "#878787",
                  }}
                  value={inputs.specify}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item mobile={12}>
            <FormGroup>
              <FormControlLabel
                checked={inputs.agree}
                control={
                  <Checkbox
                    sx={{
                      "py": "0",
                      "color": "#AFAFAF",
                      "&.Mui-checked": {
                        color: "#EE3131",
                      },
                    }}
                  />
                }
                label={t("check_word")}
                name="agree"
                onChange={handleCheckedChange}
                sx={{
                  mr: 0,
                  verticalAlign: "top",
                  lineHeight: "30px",
                  alignItems: "flex-start",
                }}
              />
            </FormGroup>
          </Grid>
          <Grid item laptop={12}>
            <CtaButton
              disabled={!canSubmit}
              loading={isLoading}
              onClick={handleSubmit}
            >
              {t("submit")}
            </CtaButton>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};
export default React.memo(TalkModal);
