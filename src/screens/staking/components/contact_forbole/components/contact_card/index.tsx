import { ExpandIcon } from "@icons";
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
import React, { useMemo } from "react";

import useContactCard from "./hooks";
import { styles } from "./styles";

const ExpandIconWrapper = (props: Record<string, unknown>) => (
  <ExpandIcon {...props} />
);

const ContactCard = () => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const { handleSubmit, handleInputChange, inputs, setInputs, canSubmit } =
    useContactCard();

  const [isOpen, setIsOpen] = React.useState(false);

  const options = useMemo(
    () => [
      t("select option"),
      t("general support"),
      t("partnership collab"),
      t("marketing collab"),
      t("others"),
    ],
    [t],
  );

  React.useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <Card
      sx={{
        background: theme.palette.primary.main,
        boxShadow:
          "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
        borderRadius: theme.spacing(3),
        maxWidth: "100%",
        margin: "auto",
        [theme.breakpoints.up("laptop")]: {
          maxWidth: "70%",
        },
      }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <CardContent
          sx={{
            padding: theme.spacing(3),
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(5),
              gridGap: theme.spacing(5),
              display: "grid",
              gridTemplateRows: "repeat(2, 1fr)",
              gridTemplateColumns: "repeat(6, 1fr)",
            },
          }}
        >
          <Box sx={styles.nameBox}>
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
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="name"
              onChange={handleInputChange}
              placeholder={t("name")}
              sx={styles.inputField}
              value={inputs.name}
            />
          </Box>
          <Box sx={styles.mailBox}>
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
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="email"
              onChange={handleInputChange}
              placeholder={t("email")}
              sx={styles.inputField}
              value={inputs.email}
            />
          </Box>
          <Box sx={styles.select}>
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
          <CardActions sx={styles.buttonDiv}>
            <Button disabled={!canSubmit} sx={styles.button} type="submit">
              {t("get in touch!")}
            </Button>
          </CardActions>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCard;
