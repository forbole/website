import { KeyboardArrowDownTwoTone } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";

import CtaButton from "../cta-button";
import FormInput from "../form_input";
import * as styles from "./index.module.scss";

type Props = {
  canSubmit: boolean;
  handleInputChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  inputs: {
    company: string;
    email: string;
    help: string;
    name: string;
  };
  isLoading: boolean;
};

const MenuProps = {
  PaperProps: {
    style: {},
    sx: {
      "& li:hover": {
        backgroundColor: "rgba(107, 97, 254, 0.24)",
      },
      "& li.Mui-selected": {
        backgroundColor: "rgba(107, 97, 254, 0.7)",
      },
      "& li.Mui-selected:hover": {
        backgroundColor: "rgba(107, 97, 254, 0.8)",
      },
      "backgroundColor": "white",
      "borderRadius": "8px",
      "boxShadow": "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
    },
  },
};

const ContactFrom = forwardRef<HTMLDivElement, Props>(
  ({ canSubmit, handleInputChange, handleSubmit, inputs, isLoading }, ref) => {
    const theme = useTheme();
    const { t } = useTranslation("enterprise_solution");

    const helpList = [
      {
        label: t("technical_support"),
      },
      {
        label: t("business_support"),
      },
      {
        label: t("other"),
      },
    ];

    return (
      <Stack className={styles.wrapper} component="div" ref={ref}>
        <Grid
          columnSpacing={theme.spacing(4)}
          container
          rowSpacing={{ desktop: theme.spacing(4), mobile: theme.spacing(3) }}
        >
          <Grid item laptop={6} mobile={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "590",
              }}
            >
              {t("your_name")}
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
              {t("your_company")}
            </Typography>
            <FormInput
              name="company"
              onInput={handleInputChange}
              placeholder={t("company")}
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
              {t("your_email")}
              <span style={{ color: "#FF426B" }}>*</span>
            </Typography>
            <FormInput
              name="email"
              onInput={handleInputChange}
              placeholder={t("email")}
              value={inputs.email}
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
              {t("how")}
              <span style={{ color: "#FF426B" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              <Select
                IconComponent={KeyboardArrowDownTwoTone}
                MenuProps={MenuProps}
                displayEmpty
                name="help"
                onChange={handleInputChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span className={styles.select}>{t("select")}</span>;
                  }

                  return selected;
                }}
                sx={{
                  "&:hover>.MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.custom.forbole.indigo,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.custom.forbole.indigo,
                  },
                  "&>.MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "light" ? "#fff" : "#2D3843",
                    borderWidth: "2px",
                  },
                  "&>div": {
                    padding: "14px 18px",
                  },
                  "borderRadius": "8px",
                  "boxShadow": "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
                  "fontSize": "16px",
                }}
                value={inputs.help}
              >
                {helpList.map((i, j) => (
                  <MenuItem key={j} value={i.label}>
                    {i.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item laptop={12}>
            <CtaButton
              disabled={!canSubmit}
              loading={isLoading}
              onClick={handleSubmit}
            >
              {t("touch")}
            </CtaButton>
          </Grid>
        </Grid>
      </Stack>
    );
  },
);

export default ContactFrom;
