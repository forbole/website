import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";

import CtaButton from "@src/components/cta-button";
import ExpandIcon from "@src/components/icons/icon_expand_more.svg";

import useContactCard from "./hooks";
import * as styles from "./index.module.scss";

const ExpandIconWrapper = (props: Record<string, unknown>) => (
  <ExpandIcon {...props} />
);

const ContactCard = () => {
  const theme = useTheme();
  const { t } = useTranslation("staking");

  const { canSubmit, handleInputChange, handleSubmit, inputs, setInputs } =
    useContactCard();

  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(
    () => [
      t("select option"),
      t("technical_support"),
      t("business_support"),
      t("others"),
    ],
    [t],
  );

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <Card className={styles.wrapper}>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent className={styles.cardContent}>
          <div className={styles.name}>
            <h6 className={styles.label}>{t("your name")}</h6>
            <TextField
              className={styles.input}
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="name"
              onChange={handleInputChange}
              placeholder={t("name")}
              value={inputs.name}
            />
          </div>
          <div className={styles.mail}>
            <h6 className={styles.label}>{t("your email")}</h6>
            <TextField
              className={styles.input}
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="email"
              onChange={handleInputChange}
              placeholder={t("email")}
              value={inputs.email}
            />
          </div>
          <div className={styles.select}>
            <h6 className={styles.label}>{t("how can we help you")}</h6>
            <FormControl>
              {inputs.option === "" ? (
                <InputLabel focused={false} id="item_type_label" shrink={false}>
                  {options[0]}
                </InputLabel>
              ) : null}
              <Select
                IconComponent={ExpandIconWrapper}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        "&:hover": {
                          background:
                            " linear-gradient(286.17deg, rgba(212, 49, 238, 0.24) 0%, rgba(255, 66, 107, 0.24) 100%)",
                        },
                        "padding": 2,
                      },
                      "bgcolor": theme.palette.primary.main,
                      "borderRadius": 1,
                      "boxShadow":
                        "0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)",
                      "marginTop": 1,
                    },
                  },
                  variant: "menu",
                }}
                onChange={(e) => {
                  const { value } = e.target;

                  setInputs((input) => ({
                    ...input,
                    option: value,
                  }));
                }}
                onClose={() => {
                  setIsOpen(false);
                }}
                onOpen={() => {
                  setIsOpen(true);
                }}
                open={isOpen}
                value={inputs.option}
                variant="outlined"
              >
                {options.slice(1).map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <CardActions className={styles.buttonDiv}>
            <CtaButton disabled={!canSubmit} type="submit">
              {t("get in touch!")}
            </CtaButton>
          </CardActions>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCard;
