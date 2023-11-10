/* eslint-disable no-unused-vars */
import { DropDownIcon } from "@icons";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getNetworkInfo } from "@src/utils/network_info";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React from "react";

import { calculatorKeys } from "./config";
import { styles } from "./styles";

const Calculator = (props: any) => {
  const { t } = useTranslation("staking");
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  const {
    selectedToken,
    setSelectedToken,
    totalEarnings,
    handleChange,
    tokens,
    monthlyPeriods,
    setMonthlyPeriods,
  } = props;

  const networkData = calculatorKeys.map((x: string | number) =>
    getNetworkInfo(x),
  );

  React.useEffect(() => {
    if (selectedToken === "") {
      setSelectedToken(networkData[0]);
    }
  }, [selectedToken]);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setMonthlyPeriods(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyPeriods(
      event.target.value === "" ? "" : Number(event.target.value),
    );
  };

  const handleBlur = () => {
    if (monthlyPeriods < 0) {
      setMonthlyPeriods(0);
    } else if (monthlyPeriods > 12) {
      setMonthlyPeriods(12);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(269.66deg, rgba(2, 158, 225, 0.4) -12.39%, rgba(2, 38, 225, 0.2) 99.38%), rgba(255, 255, 255, 0.8)",
        boxShadow:
          "10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)",
        borderRadius: theme.spacing(3),
        padding: theme.spacing(4, 2.5),
        [theme.breakpoints.up("laptop")]: {
          padding: theme.spacing(5),
        },
      }}
    >
      <Typography
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          paddingBottom: theme.spacing(1),
        }}
        variant="body1"
      >
        {t("select token")}
      </Typography>
      <Box sx={styles.select}>
        <FormControl>
          <Select
            displayEmpty
            IconComponent={DropDownIcon}
            id="demo-simple-select"
            labelId="demo-simple-select-label"
            MenuProps={{
              variant: "menu",
              disableScrollLock: true,
              PaperProps: {
                sx: {
                  "height": "50vh",
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
            onChange={(e) => setSelectedToken(e.target.value)}
            onClose={() => {
              setIsOpen(false);
            }}
            onOpen={() => {
              setIsOpen(true);
            }}
            open={isOpen}
            value={selectedToken}
          >
            {networkData.map((network, i) => (
              <MenuItem key={i} value={network}>
                <Box
                  sx={{
                    "display": "flex",
                    "flexDirection": "row",
                    "alignContent": "center",
                    "justifyContent": "flex-start",
                    "& .image": {
                      width: `${theme.spacing(6.5)} !important`,
                      height: `${theme.spacing(6.5)} !important`,
                      borderRadius: "100%",
                      boxShadow:
                        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
                    },
                  }}
                >
                  <Box className="image">
                    {network.image && (
                      <Image
                        height="52px"
                        objectFit="contain"
                        quality={100}
                        src={network.image}
                        width="52px"
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingLeft: theme.spacing(2),
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, fontSize: theme.spacing(2.5) }}
                      variant="h4"
                    >
                      {network.denom.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: theme.spacing(1.5),
                        color: "#878787",
                      }}
                      variant="body1"
                    >
                      {network.label}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          padding: theme.spacing(4, 0, 1, 0),
        }}
        variant="body1"
      >
        {t("token amount")}
      </Typography>
      <Box sx={styles.input}>
        <OutlinedInput
          onChange={handleChange}
          placeholder={t("token amount placeholder")}
          value={tokens?.display}
        />
      </Box>
      <Typography
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          padding: theme.spacing(4, 0, 1, 0),
        }}
        variant="body1"
      >
        {t("length of time")}
      </Typography>
      <Box sx={styles.input}>
        <Grid
          columns={12}
          container
          justifyContent="space-between"
          marginLeft={0}
          spacing={onlyLargeScreen ? 1 : 0}
          width="100%"
        >
          <Grid
            alignItems="center"
            container
            display="flex"
            laptop={8}
            mobile={12}
            spacing={1}
          >
            <Grid display="flex" height="100%" item laptop={1} mobile={1}>
              <Typography
                sx={{
                  fontSize: theme.spacing(2),
                  fontWeight: 600,
                  color: theme.palette.custom.forbole.blue,
                  alignSelf: "center",
                }}
                variant="body1"
              >
                0
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              display="flex"
              height="100%"
              item
              laptop={10}
              mobile={8}
            >
              <Slider
                defaultValue={0}
                max={12}
                min={0}
                onChange={handleSliderChange}
                size="small"
                step={1}
                sx={styles.slider}
                value={monthlyPeriods}
              />
            </Grid>
            <Grid
              alignItems="center"
              display="flex"
              height="100%"
              item
              laptop={1}
              mobile={1}
            >
              <Typography
                sx={{
                  fontSize: theme.spacing(2),
                  fontWeight: 600,
                  color: theme.palette.custom.forbole.blue,
                }}
                variant="body1"
              >
                12
              </Typography>
            </Grid>
          </Grid>
          <Grid item laptop={4} mobile={12}>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    sx={{
                      fontSize: theme.spacing(2),
                      fontWeight: 600,
                      color: theme.palette.custom.forbole.blue,
                    }}
                    variant="body1"
                  >
                    {t("months")}
                  </Typography>
                </InputAdornment>
              }
              inputProps={{
                "step": 1,
                "min": 0,
                "max": 12,
                "type": "number",
                "aria-labelledby": "input-slider",
              }}
              onBlur={handleBlur}
              onChange={handleInputChange}
              sx={styles.inputBase}
              value={monthlyPeriods}
            />
          </Grid>
        </Grid>
      </Box>
      {totalEarnings.monthlyEarnings.tokens !== "0" &&
      totalEarnings.monthlyEarnings.amount !== "0" ? (
        <>
          <Typography
            sx={{
              fontSize: theme.spacing(2),
              fontWeight: 600,
              color: theme.palette.custom.forbole.blue,
              padding: theme.spacing(4, 0, 2, 0),
            }}
            variant="body1"
          >
            {t("estimated earning")}
          </Typography>
          <Box sx={styles.card}>
            <Box sx={styles.tokenResult}>
              <Box className="image">
                {selectedToken.image && (
                  <Image
                    height="28px"
                    objectFit="contain"
                    quality={100}
                    src={selectedToken.image}
                    width="28px"
                  />
                )}
              </Box>
              <Typography
                color={theme.palette.custom.forbole.blue}
                fontSize={theme.spacing(2.25)}
                fontWeight="600"
                paddingLeft={1}
                variant="h4"
              >
                {selectedToken.denom.toUpperCase()}
              </Typography>
            </Box>
            <Box sx={styles.amountResult}>
              <Typography
                color={theme.palette.custom.forbole.blue}
                fontSize={theme.spacing(2)}
                fontWeight="600"
                variant="h4"
              >
                {totalEarnings.monthlyEarnings.tokens}
              </Typography>
              <Typography
                color="#878787"
                display={
                  totalEarnings.monthlyEarnings.amount === "0.00"
                    ? "none"
                    : "block"
                }
                fontSize={theme.spacing(2)}
                fontWeight="400"
                padding={theme.spacing(0.5, 0, 0, 0)}
                variant="h4"
              >
                $ {totalEarnings.monthlyEarnings.amount} USD
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.buttonDiv}>
            <Button
              disabled={!selectedToken.delegate}
              href={selectedToken.delegate || ""}
              rel="noreferrer"
              sx={styles.button}
              target="_blank"
            >
              {t("stake with us!")}
            </Button>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Calculator;
