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
import { memo, useMemo, useRef } from "react";

import CtaButton from "../cta-button";
import FormInput from "../formInput";
import { Close } from "../icons";

interface Props {
  canSubmit: boolean;
  close?: (b: boolean) => void;
  handleCheckedChange: (event: any) => void;
  handleClear: (field: any) => void;
  handleInputChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  inputs: {
    "agree": boolean;
    "company": string;
    "Data API": boolean;
    "email": string;
    "GraphQL": boolean;
    "name": string;
    "Other": boolean;
    "RPC Endpoints": boolean;
    "specify": string;
    "telegram": string;
  };
  isLoading: boolean;
  open?: boolean;
  staking?: any;
}

const TalkModal = ({
  canSubmit,
  close,
  handleCheckedChange,
  handleClear,
  handleInputChange,
  handleSubmit,
  inputs,
  isLoading,
  open = false,
  staking,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation("developer_tools");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (e: any) => {
    const { checked, name } = e.target;

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
              backdropFilter: "blur(8px)",
              background: "rgba(123, 123, 123, 0.20)",
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
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.64) 64.58%, #FFF 100%)",
          borderRadius: "24px",
          boxShadow:
            "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
          color: "#202A43",
          gap: staking ? "24px" : "40px",
          margin: "164px auto",
          padding: "64px",
          [theme.breakpoints.down("laptop")]: {
            gap: "24px",
            mt: "104px",
            padding: "24px",
            width: "343px",
          },
          width: "1000px",
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
                border: "8px solid transparent",
                boxSizing: "content-box",
                flexShrink: "0",
              }}
            />
          )}
        </Stack>
        <Grid
          container
          spacing={{ desktop: theme.spacing(4), mobile: theme.spacing(3) }}
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
                borderRadius: "8px",
                boxShadow:
                  "0px 10px 32px -4px rgba(96, 60, 238, 0.10), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
                overflow: "hidden",
                py: 0,
                width: "100%",
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
                          "&.Mui-checked": {
                            color: "#EE3131",
                          },
                          "color": "#AFAFAF",
                          "py": "0",
                        }}
                        value={value.name}
                      />
                    }
                    id={value.label}
                    label={value.label}
                    labelPlacement="start"
                    sx={{
                      fontSize: "16px",
                      justifyContent: "space-between",
                      lineHeight: "30px",
                      m: 0,
                      p: "12px 0",
                      width: "100%",
                    }}
                  />
                </ListItem>
              ))}
              <ListItem
                disablePadding
                sx={{
                  "&:last-child": { borderBottom: "0" },
                  "bgcolor": "#ffffff",
                  "borderBottom": "2px solid rgba(96, 60, 238, 0.28)",
                  "width": "auto",
                }}
              >
                <Input
                  disableUnderline
                  disabled={!inputs.Other}
                  fullWidth
                  name="specify"
                  onInput={handleInputChange}
                  placeholder={t("item_5")}
                  ref={inputRef}
                  sx={{
                    color: "#878787",
                    fontSize: "16px",
                    lineHeight: "30px",
                    p: "12px",
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
                      "&.Mui-checked": {
                        color: "#EE3131",
                      },
                      "color": "#AFAFAF",
                      "py": "0",
                    }}
                  />
                }
                label={t("check_word")}
                name="agree"
                onChange={handleCheckedChange}
                sx={{
                  alignItems: "flex-start",
                  lineHeight: "30px",
                  mr: 0,
                  verticalAlign: "top",
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

export default memo(TalkModal);
