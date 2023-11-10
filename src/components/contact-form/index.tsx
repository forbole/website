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
import FormInput from "../formInput";

type Props = {
  inputs: {
    name: string;
    email: string;
    company: string;
    help: string;
  };
  handleInputChange: (event: any) => void;
  handleSubmit: (event: any) => void;
  canSubmit: boolean;
  isLoading: boolean;
};
const MenuProps = {
  PaperProps: {
    style: {},
    sx: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
      "& li:hover": {
        backgroundColor: "rgba(107, 97, 254, 0.24)",
      },
      "& li.Mui-selected": {
        backgroundColor: "rgba(107, 97, 254, 0.7)",
      },
      "& li.Mui-selected:hover": {
        backgroundColor: "rgba(107, 97, 254, 0.8)",
      },
    },
  },
};
const ContactFrom = forwardRef<HTMLDivElement, Props>(
  ({ inputs, handleInputChange, handleSubmit, canSubmit, isLoading }, ref) => {
    const theme = useTheme();
    const { t } = useTranslation("enterprise_solution");

    const helpList = [
      {
        label: t("support"),
      },
      {
        label: t("partnership"),
      },
      {
        label: t("marketing"),
      },
      {
        label: t("other"),
      },
    ];

    return (
      <Stack
        component="div"
        ref={ref}
        sx={{
          maxWidth: "776px",
          padding: "40px",
          gap: "32px",
          borderRadius: "24px",
          margin: "40px auto",
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.64) 64.58%, #FFF 100%)",
          boxShadow:
            "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
          color: "#202A43",
          [theme.breakpoints.down("laptop")]: {
            padding: "24px",
            gap: "24px",
          },
        }}
      >
        <Grid
          container
          rowSpacing={{ mobile: theme.spacing(3), desktop: theme.spacing(4) }}
          columnSpacing={theme.spacing(4)}
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
              placeholder={t("name")}
              onInput={handleInputChange}
              value={inputs.name}
              name="name"
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
              placeholder={t("company")}
              onInput={handleInputChange}
              value={inputs.company}
              name="company"
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
              placeholder={t("email")}
              onInput={handleInputChange}
              value={inputs.email}
              name="email"
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
                displayEmpty
                value={inputs.help}
                onChange={handleInputChange}
                IconComponent={KeyboardArrowDownTwoTone}
                sx={{
                  borderRadius: "8px",
                  "&>.MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor:
                      theme.palette.mode === "light" ? "#fff" : "#2D3843",
                  },
                  "&:hover>.MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.custom.forbole.indigo,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.custom.forbole.indigo,
                  },
                  boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
                  fontSize: "16px",
                  "&>div": {
                    padding: "14px 18px",
                  },
                }}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <span style={{ color: "#878787" }}>{t("select")}</span>
                    );
                  }
                  return selected;
                }}
                name="help"
                MenuProps={MenuProps}
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
              onClick={handleSubmit}
              disabled={!canSubmit}
              loading={isLoading}
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
