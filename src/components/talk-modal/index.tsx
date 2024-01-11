import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { memo, useMemo, useRef } from "react";

import CtaButton from "../cta-button";
import FormInput from "../form_input";
import CloseIcon from "../icons/close.svg";
import Modal from "../modal";
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
      className={[styles.wrapper, staking ? styles.staking : ""].join(" ")}
      onClose={() => {
        close?.(false);
      }}
      open={open}
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
          <List className={styles.list} dense>
            {selectList.map((value) => (
              <ListItem className={styles.item} key={value.label}>
                <FormControlLabel
                  className={styles.control}
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
                />
              </ListItem>
            ))}
            <ListItem className={styles.inputItem}>
              <Input
                className={styles.input}
                disableUnderline
                disabled={!inputs.Other}
                fullWidth
                name="specify"
                onInput={handleInputChange}
                placeholder={t("item_5")}
                ref={inputRef}
                value={inputs.specify}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item mobile={12}>
          <FormGroup>
            <FormControlLabel
              checked={inputs.agree}
              className={styles.agree}
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
    </Modal>
  );
};

export default memo(TalkModal);
