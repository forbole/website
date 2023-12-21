import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useRef } from "react";

import CtaButton from "@src/components/cta-button";
import FormInput from "@src/components/formInput";
import Layout from "@src/components/layout";
import SuccessModal from "@src/components/success-modal";

import useContactForm from "./hooks";
import * as styles from "./index.module.scss";

const Contact = () => {
  const { t } = useTranslation("contact");
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    handleClear,
    canSubmit,
    handleCheckedChange,
    success,
    setSuccess,
    isLoading,
  } = useContactForm();
  const theme = useTheme();
  const router = useRouter();

  const selectList = [
    { label: t("item_1"), name: "collaboration" },
    { label: t("item_2"), name: "enterprise_solution" },
    { label: t("item_3"), name: "careers" },
    { label: t("item_4"), name: "other" },
  ] as const;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (e: any) => {
    const { name, checked } = e.target;

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
      <Container>
        <Stack className={styles.form}>
          <Stack>
            <Typography className={styles.title}>{t("form_title")}</Typography>
            <Typography className={styles.desc}>{t("form_desc")}</Typography>

            <Stack className={styles.contact}>
              <Stack direction="row">
                <Box
                  className={styles.icon}
                  mr="8px"
                  onClick={() => {
                    router.push("mailto:info@forbole.com");
                  }}
                >
                  <img alt="" src="/icons/email.svg" />
                </Box>
                <Box
                  className={styles.icon}
                  onClick={() => {
                    router.push("https://t.me/forbole");
                  }}
                >
                  <img alt="" src="/icons/Telegram.svg" />
                </Box>
              </Stack>
              <Typography className={styles.method}>{t("method")}</Typography>
            </Stack>
          </Stack>
          <Grid
            container
            spacing={{ mobile: theme.spacing(3), desktop: theme.spacing(4) }}
          >
            <Grid item laptop={6} mobile={12}>
              <Typography className={styles.label}>
                {t("label_name")}
                <span className={styles.required}>*</span>
              </Typography>
              <FormInput
                name="name"
                onInput={handleInputChange}
                placeholder={t("name")}
                value={inputs.name}
              />
            </Grid>
            <Grid item laptop={6} mobile={12}>
              <Typography className={styles.label}>
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
              <Typography className={styles.label}>
                {t("label_email")}
                <span className={styles.required}>*</span>
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
              <Typography className={styles.label}>
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
              <Typography className={styles.labelStart}>
                {t("get_start")}
                <span className={styles.required}>*</span>
              </Typography>
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
      </Container>
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
