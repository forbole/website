import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";

import { ExpandIcon } from "@src/components/icons";

import useContactCard from "./hooks";
import * as styles from "./index.module.scss";

const ExpandIconWrapper = (props: Record<string, unknown>) => (
  <ExpandIcon {...props} />
);

const ContactCard = () => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const { handleSubmit, handleInputChange, inputs, setInputs, canSubmit } =
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
          <Box className={styles.name}>
            <Typography
              component="div"
              fontSize={theme.spacing(2)}
              fontWeight={600}
              gutterBottom
              pb={theme.spacing(1)}
              textAlign="left"
              variant="h6"
            >
              {t("your name")}
            </Typography>
            <TextField
              className={styles.input}
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="name"
              onChange={handleInputChange}
              placeholder={t("name")}
              value={inputs.name}
            />
          </Box>
          <Box className={styles.mail}>
            <Typography
              component="div"
              fontSize={theme.spacing(2)}
              fontWeight={600}
              gutterBottom
              pb={theme.spacing(1)}
              textAlign="left"
              variant="h6"
            >
              {t("your email")}
            </Typography>
            <TextField
              className={styles.input}
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="email"
              onChange={handleInputChange}
              placeholder={t("email")}
              value={inputs.email}
            />
          </Box>
          <Box className={styles.select}>
            <Typography
              component="div"
              fontSize={theme.spacing(2)}
              fontWeight={600}
              gutterBottom
              pb={theme.spacing(1)}
              textAlign="left"
              variant="h6"
            >
              {t("how can we help you")}
            </Typography>
            <FormControl>
              {inputs.option === "" ? (
                <InputLabel focused={false} id="item_type_label" shrink={false}>
                  {options[0]}
                </InputLabel>
              ) : null}
              <Select
                IconComponent={ExpandIconWrapper}
                MenuProps={{
                  variant: "menu",
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      "bgcolor": theme.palette.primary.main,
                      "marginTop": 1,
                      "boxShadow":
                        "0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)",
                      "borderRadius": 1,
                      "& .MuiMenuItem-root": {
                        "padding": 2,
                        "&:hover": {
                          background:
                            " linear-gradient(286.17deg, rgba(212, 49, 238, 0.24) 0%, rgba(255, 66, 107, 0.24) 100%)",
                        },
                      },
                    },
                  },
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
          </Box>
          <CardActions className={styles.buttonDiv}>
            <Button
              className={styles.button}
              disabled={!canSubmit}
              type="submit"
            >
              {t("get in touch!")}
            </Button>
          </CardActions>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCard;
