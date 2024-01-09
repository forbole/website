import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
  Modal,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { memo, useMemo, useRef } from "react";

import CtaButton from "../cta-button";
import FormInput from "../form_input";
import CloseIcon from "../icons/close.svg";
import * as styles from "./index.module.scss";

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
      <div
        className={[styles.wrapper, staking ? styles.staking : ""].join(" ")}
      >
        <div className={styles.content}>
          <div>
            <div className={styles.title}>{t("form_title")}</div>

            <div className={styles.desc}>{t("form_desc")}</div>
          </div>
          {close && (
            <CloseIcon
              onClick={() => close?.(false)}
              style={{
                border: "8px solid transparent",
                boxSizing: "content-box",
                flexShrink: "0",
              }}
            />
          )}
        </div>
        <Grid container spacing={{ desktop: "32px", mobile: "24px" }}>
          <Grid item laptop={6} mobile={12}>
            <div className={styles.name}>
              {t("label_name")}
              <span style={{ color: "#FF426B" }}>*</span>
            </div>
            <FormInput
              name="name"
              onInput={handleInputChange}
              placeholder={t("name")}
              value={inputs.name}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <div className={styles.company}>{t("label_company")}</div>
            <FormInput
              name="company"
              onInput={handleInputChange}
              placeholder={t("Company")}
              value={inputs.company}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <div className={styles.email}>
              {t("label_email")}
              <span style={{ color: "#FF426B" }}>*</span>
            </div>
            <FormInput
              name="email"
              onInput={handleInputChange}
              placeholder={t("Email")}
              type="email"
              value={inputs.email}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <div className={styles.telegram}>{t("label_telegram")}</div>
            <FormInput
              name="telegram"
              onInput={handleInputChange}
              placeholder={t("Telegram")}
              value={inputs.telegram}
            />
          </Grid>
          <Grid item laptop={6} mobile={12}>
            <div className={styles.start}>
              {t("get_start")}
              <span style={{ color: "#FF426B" }}>*</span>
            </div>
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
      </div>
    </Modal>
  );
};

export default memo(TalkModal);
