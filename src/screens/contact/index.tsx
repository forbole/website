import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRef } from "react";

import CtaButton from "@src/components/cta-button";
import FormInput from "@src/components/form_input";
import Layout from "@src/components/layout";
import SuccessModal from "@src/components/success-modal";

import useContactForm from "./hooks";
import * as styles from "./index.module.scss";

const Contact = () => {
  const { t } = useTranslation("contact");

  const {
    canSubmit,
    handleCheckedChange,
    handleClear,
    handleInputChange,
    handleSubmit,
    inputs,
    isLoading,
    setSuccess,
    success,
  } = useContactForm();

  const theme = useTheme();

  const selectList = [
    { label: t("item_1"), name: "collaboration" },
    { label: t("item_2"), name: "enterprise_solution" },
    { label: t("item_3"), name: "careers" },
    { label: t("item_4"), name: "other" },
  ] as const;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (e: any) => {
    const { checked, name } = e.target;

    if (name === "other") {
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

  return (
    <Layout description={t("form_desc")} footer title={t("page_title")}>
      <div>
        <Stack className={styles.form}>
          <Stack>
            <span className={styles.title}>{t("form_title")}</span>
            <span className={styles.desc}>{t("form_desc")}</span>

            <Stack className={styles.contact}>
              <Stack direction="row">
                <Link href="mailto:info@forbole.com">
                  <div className={styles.icon}>
                    <img alt="" src="/icons/email.svg" />
                  </div>
                </Link>
                <Link href="https://t.me/forbole">
                  <div className={styles.icon}>
                    <img alt="" src="/icons/Telegram.svg" />
                  </div>
                </Link>
              </Stack>
              <span className={styles.method}>{t("method")}</span>
            </Stack>
          </Stack>
          <Grid
            container
            spacing={{ desktop: theme.spacing(4), mobile: theme.spacing(3) }}
          >
            <Grid item laptop={6} mobile={12}>
              <span className={styles.label}>
                {t("label_name")}
                <span className={styles.required}>*</span>
              </span>
              <FormInput
                name="name"
                onInput={handleInputChange}
                placeholder={t("name")}
                value={inputs.name}
              />
            </Grid>
            <Grid item laptop={6} mobile={12}>
              <span className={styles.label}>{t("label_company")}</span>
              <FormInput
                name="company"
                onInput={handleInputChange}
                placeholder={t("Company")}
                value={inputs.company}
              />
            </Grid>
            <Grid item laptop={6} mobile={12}>
              <span className={styles.label}>
                {t("label_email")}
                <span className={styles.required}>*</span>
              </span>
              <FormInput
                name="email"
                onInput={handleInputChange}
                placeholder={t("Email")}
                type="email"
                value={inputs.email}
              />
            </Grid>
            <Grid item laptop={6} mobile={12}>
              <span className={styles.label}>{t("label_telegram")}</span>
              <FormInput
                name="telegram"
                onInput={handleInputChange}
                placeholder={t("Telegram")}
                value={inputs.telegram}
              />
            </Grid>
            <Grid item laptop={6} mobile={12}>
              <span className={styles.labelStart}>
                {t("get_start")}
                <span className={styles.required}>*</span>
              </span>
              <List className={styles.list} dense>
                {selectList.map((value) => (
                  <ListItem className={styles.listItem} key={value.label}>
                    <FormControlLabel
                      className={styles.checkboxWrapper}
                      control={
                        <Checkbox
                          checked={inputs[value.name]}
                          className={styles.checkbox}
                          name={value.name}
                          onChange={handleToggle}
                          value={value.name}
                        />
                      }
                      id={value.label}
                      label={value.label}
                      labelPlacement="start"
                    />
                  </ListItem>
                ))}
                <ListItem className={styles.listItemInput} disablePadding>
                  <Input
                    className={styles.input}
                    disableUnderline
                    disabled={!inputs.other}
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
                  className={styles.agreeWrapper}
                  control={
                    <Checkbox
                      checked={inputs.agree}
                      className={styles.checkboxAgree}
                      name="agree"
                      onChange={handleCheckedChange}
                    />
                  }
                  label={t("check_word")}
                />
              </FormGroup>
            </Grid>
            <Grid item laptop={12}>
              <CtaButton
                data-test="contact-submit"
                disabled={!canSubmit}
                loading={isLoading}
                onClick={handleSubmit}
              >
                {t("submit")}
              </CtaButton>
            </Grid>
          </Grid>
        </Stack>
      </div>
      <SuccessModal
        close={setSuccess}
        fixed
        middle_word={t("thanks")}
        open={success}
        up_word={t("contact")}
      />
    </Layout>
  );
};

export default Contact;
