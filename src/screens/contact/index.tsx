import React, { useRef } from "react";
import useTranslation from "next-translate/useTranslation";
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
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout } from "@components";
import FormInput from "@src/components/formInput";
import CtaButton from "@src/components/cta-button";
import SuccessModal from "@src/components/success-modal";
import { styles } from "./styles";
import useContactForm from "./hooks";
import { useRouter } from "next/router";

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
    { label: "item_1", name: "collaboration" },
    { label: "item_2", name: "enterprise_solution" },
    { label: "item_3", name: "careers" },
    { label: "item_4", name: "other" },
  ] as const;

  const inputRef = useRef<HTMLInputElement>(null);
  const handleToggle = (e: any) => {
    const { name, checked } = e.target;
    if (name == "other") {
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
    <Layout title={t("page_title")} navLink="/contact" footer>
      <Container>
        <Stack
          sx={{
            width: "1000px",
            padding: "64px",
            gap: "40px",
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

            <Stack
              sx={{
                mt: "24px",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                [theme.breakpoints.down("laptop")]: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              }}
            >
              <Stack direction={"row"}>
                <Box
                  sx={styles.iconBox}
                  mr="8px"
                  onClick={() => {
                    router.push("mailto:info@forbole.com");
                  }}
                >
                  <img src="/icons/email.svg" alt="" />
                </Box>
                <Box
                  sx={styles.iconBox}
                  onClick={() => {
                    router.push("https://t.me/forbole");
                  }}
                >
                  <img src="/icons/Telegram.svg" alt="" />
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#202A43",
                  opacity: "0.6",
                }}
              >
                {t("method")}
              </Typography>
            </Stack>
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
                value={inputs.name}
                name="name"
                placeholder={t("name")}
                onInput={handleInputChange}
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
                value={inputs.company}
                name="company"
                placeholder={t("Company")}
                onInput={handleInputChange}
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
                value={inputs.email}
                name="email"
                type="email"
                placeholder={t("Email")}
                onInput={handleInputChange}
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
                value={inputs.telegram}
                name="telegram"
                placeholder={t("Telegram")}
                onInput={handleInputChange}
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
                {selectList.map((value) => {
                  return (
                    <ListItem
                      key={value.label}
                      sx={{
                        bgcolor: "#ffffff",
                        borderBottom: "2px solid rgba(96, 60, 238, 0.28)",
                      }}
                    >
                      <FormControlLabel
                        id={t(value.label)}
                        sx={{
                          width: "100%",
                          justifyContent: "space-between",
                          m: 0,
                          p: "12px 0",
                          fontSize: "16px",
                          lineHeight: "30px",
                        }}
                        labelPlacement="start"
                        control={
                          <Checkbox
                            name={value.name}
                            value={value.name}
                            checked={inputs[value.name]}
                            onChange={handleToggle}
                            sx={{
                              py: "0",
                              color: "#AFAFAF",
                              "&.Mui-checked": {
                                color: "#EE3131",
                              },
                            }}
                          />
                        }
                        label={t(value.label)}
                      />
                    </ListItem>
                  );
                })}
                <ListItem
                  disablePadding
                  sx={{
                    width: "auto",
                    "&:last-child": { borderBottom: "0" },
                    bgcolor: "#ffffff",
                    borderBottom: "2px solid rgba(96, 60, 238, 0.28)",
                  }}
                >
                  <Input
                    onInput={handleInputChange}
                    ref={inputRef}
                    value={inputs.specify}
                    name="specify"
                    placeholder={t("item_5")}
                    fullWidth
                    disableUnderline
                    disabled={!inputs["other"]}
                    sx={{
                      p: "12px",
                      fontSize: "16px",
                      lineHeight: "30px",
                      color: "#878787",
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item mobile={12}>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    mr: 0,
                    verticalAlign: "top",
                    lineHeight: "30px",
                    alignItems: "flex-start",
                  }}
                  control={
                    <Checkbox
                      name="agree"
                      checked={inputs.agree}
                      onChange={handleCheckedChange}
                      sx={{
                        py: "0",
                        color: "#AFAFAF",
                        "&.Mui-checked": {
                          color: "#EE3131",
                        },
                      }}
                    />
                  }
                  label={t("check_word")}
                />
              </FormGroup>
            </Grid>
            <Grid item laptop={12}>
              <CtaButton
                onClick={handleSubmit}
                disabled={!canSubmit}
                loading={isLoading}
              >
                {t("submit")}
              </CtaButton>
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <SuccessModal
        fixed
        open={success}
        close={setSuccess}
        up_word={t("contact")}
        middle_word={t("thanks")}
      />
    </Layout>
  );
};

export default Contact;
