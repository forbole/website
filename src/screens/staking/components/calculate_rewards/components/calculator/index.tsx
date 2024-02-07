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
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import DropDownIcon from "@src/components/icons/icon_dropdown.svg";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { NetworkKey } from "@src/utils/network_info";
import {
  cosmosNetworkKeys,
  getNetworkInfo,
  skippedRewardsNetworks,
} from "@src/utils/network_info";

import { useCalculateRewardsHook } from "../../hooks";
import { styles } from "./styles";

const Calculator = () => {
  const { t } = useTranslation("staking");
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  const {
    handleChange,
    monthlyPeriods,
    selectedToken,
    setMonthlyPeriods,
    setSelectedToken,
    tokens,
    totalEarnings,
  } = useCalculateRewardsHook();

  const networkData = cosmosNetworkKeys
    .map((x: number | string) => getNetworkInfo(x as NetworkKey))
    .filter(Boolean)
    .filter((x) => !skippedRewardsNetworks.has(x.key))
    .filter((x) => getCanClickNetwork(x));

  useEffect(() => {
    if (selectedToken === "") {
      setSelectedToken(networkData[0]);
    }
  }, [selectedToken, networkData, setSelectedToken]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMonthlyPeriods(
      event.target.value === "" ? 0 : Number(event.target.value),
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
    <Box sx={styles.wrapper}>
      <Typography
        paddingBottom={theme.spacing(1)}
        sx={styles.textBase}
        variant="body1"
      >
        {t("select token")}
      </Typography>
      <Box sx={styles.select}>
        <FormControl>
          <Select
            IconComponent={DropDownIcon}
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
                  "height": "50vh",
                  "marginTop": 1,
                },
              },
              variant: "menu",
            }}
            displayEmpty
            id="demo-simple-select"
            labelId="demo-simple-select-label"
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
              // @ts-expect-error Passing value is necessary in the calculate rewards
              <MenuItem key={i} value={network}>
                <Box sx={styles.network}>
                  <Box className="image">
                    {network.image && (
                      <Image
                        alt=""
                        height="52"
                        objectFit="contain"
                        quality={100}
                        src={network.image}
                        width="52"
                      />
                    )}
                  </Box>
                  <Box sx={styles.networkInfo}>
                    <Typography
                      sx={{ fontSize: theme.spacing(2.5), fontWeight: 600 }}
                      variant="h4"
                    >
                      {network?.denom?.toUpperCase() || ""}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#878787",
                        fontSize: theme.spacing(1.5),
                        fontWeight: 400,
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
      <Typography sx={styles.innerText} variant="body1">
        {t("token amount")}
      </Typography>
      <Box sx={styles.input}>
        <OutlinedInput
          onChange={handleChange}
          placeholder={t("token amount placeholder")}
          value={tokens?.display}
        />
      </Box>
      <Typography sx={styles.innerText} variant="body1">
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
                alignSelf="center"
                sx={styles.textBase}
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
                onChange={(_, newValue) =>
                  setMonthlyPeriods(newValue as number)
                }
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
              <Typography sx={styles.textBase} variant="body1">
                12
              </Typography>
            </Grid>
          </Grid>
          <Grid item laptop={4} mobile={12}>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <Typography sx={styles.textBase} variant="body1">
                    {t("months")}
                  </Typography>
                </InputAdornment>
              }
              inputProps={{
                "aria-labelledby": "input-slider",
                "max": 12,
                "min": 0,
                "step": 1,
                "type": "number",
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
            padding={theme.spacing(4, 0, 2, 0)}
            sx={styles.textBase}
            variant="body1"
          >
            {t("estimated earning")}
          </Typography>
          <Box sx={styles.card}>
            <Box sx={styles.tokenResult}>
              <Box className="image">
                {selectedToken.image && (
                  <Image
                    alt=""
                    height="28"
                    objectFit="contain"
                    quality={100}
                    src={selectedToken.image}
                    width="28"
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
              onClick={() => {
                handleNetworkClick(selectedToken);
              }}
              sx={styles.button}
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
