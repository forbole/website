/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  Select,
  Slider,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getNetworkInfo } from '@src/utils/network_info';
import { InfoIcon, DropDownIcon } from '@icons';
import { calculatorKeys } from './config';
import { styles } from './styles';

const Calculator = (props: any) => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));

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
    getNetworkInfo(x)
  );

  React.useEffect(() => {
    if (selectedToken === '') {
      setSelectedToken(networkData[0]);
    }
  }, [selectedToken]);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMonthlyPeriods(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyPeriods(
      event.target.value === '' ? '' : Number(event.target.value)
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
          'linear-gradient(269.66deg, rgba(2, 158, 225, 0.4) -12.39%, rgba(2, 38, 225, 0.2) 99.38%), rgba(255, 255, 255, 0.8)',
        boxShadow:
          '10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)',
        borderRadius: theme.spacing(3),
        padding: theme.spacing(4, 2.5),
        [theme.breakpoints.up('laptop')]: {
          padding: theme.spacing(5),
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          paddingBottom: theme.spacing(1),
        }}
      >
        {t('select token')}
      </Typography>
      <Box sx={styles.select}>
        <FormControl>
          <Select
            open={isOpen}
            onOpen={() => {
              setIsOpen(true);
            }}
            onClose={() => {
              setIsOpen(false);
            }}
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedToken}
            MenuProps={{
              variant: 'menu',
              disableScrollLock: true,
              PaperProps: {
                sx: {
                  bgcolor: theme.palette.primary.main,
                  marginTop: 1,
                  boxShadow:
                    '0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)',
                  borderRadius: 1,
                  '& .MuiMenuItem-root': {
                    padding: 2,
                    '&:hover': {
                      background:
                        ' linear-gradient(286.17deg, rgba(212, 49, 238, 0.24) 0%, rgba(255, 66, 107, 0.24) 100%)',
                    },
                  },
                },
              },
            }}
            onChange={(e) => setSelectedToken(e.target.value)}
            IconComponent={DropDownIcon}
          >
            {networkData.map((network, i) => (
              <MenuItem key={i} value={network}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    '& .image': {
                      width: `${theme.spacing(6.5)} !important`,
                      height: `${theme.spacing(6.5)} !important`,
                      borderRadius: '100%',
                      boxShadow:
                        '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
                    },
                  }}
                >
                  <Box className="image">
                    <Image
                      src={network.image}
                      objectFit="contain"
                      width="52px"
                      height="52px"
                      quality={100}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingLeft: theme.spacing(2),
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, fontSize: theme.spacing(2.5) }}
                    >
                      {network.denom}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 400,
                        fontSize: theme.spacing(1.5),
                        color: '#878787',
                      }}
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
        variant="body1"
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          padding: theme.spacing(4, 0, 1, 0),
        }}
      >
        {t('token amount')}
      </Typography>
      <Box sx={styles.input}>
        <OutlinedInput
          value={tokens?.display}
          onChange={handleChange}
          placeholder={t('token amount placeholder')}
          endAdornment={
            <InputAdornment position="end">
              <InfoIcon stroke="#878787" height="24px" width="24px" />
            </InputAdornment>
          }
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: theme.spacing(2),
          fontWeight: 600,
          color: theme.palette.custom.forbole.blue,
          padding: theme.spacing(4, 0, 1, 0),
        }}
      >
        {t('length of time')}
      </Typography>
      <Box sx={styles.input}>
        <Grid
          container
          spacing={onlyLargeScreen ? 1 : 0}
          columns={12}
          marginLeft={0}
          width="100%"
          justifyContent="space-between"
        >
          <Grid
            container
            spacing={1}
            mobile={12}
            laptop={8}
            display="flex"
            alignItems="center"
          >
            <Grid item mobile={1} laptop={1} height="100%" display="flex">
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.spacing(2),
                  fontWeight: 600,
                  color: theme.palette.custom.forbole.blue,
                  alignSelf: 'center',
                }}
              >
                0
              </Typography>
            </Grid>
            <Grid
              item
              mobile={8}
              laptop={10}
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Slider
                size="small"
                defaultValue={0}
                onChange={handleSliderChange}
                value={monthlyPeriods}
                step={1}
                min={0}
                max={12}
                sx={styles.slider}
              />
            </Grid>
            <Grid
              item
              mobile={1}
              laptop={1}
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.spacing(2),
                  fontWeight: 600,
                  color: theme.palette.custom.forbole.blue,
                }}
              >
                12
              </Typography>
            </Grid>
          </Grid>
          <Grid item mobile={12} laptop={4}>
            <OutlinedInput
              value={monthlyPeriods}
              onChange={handleInputChange}
              onBlur={handleBlur}
              sx={styles.inputBase}
              inputProps={{
                step: 1,
                min: 0,
                max: 12,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: theme.spacing(2),
                      fontWeight: 600,
                      color: theme.palette.custom.forbole.blue,
                    }}
                  >
                    {t('months')}
                  </Typography>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
      {totalEarnings.monthlyEarnings.tokens !== '0' &&
      totalEarnings.monthlyEarnings.amount !== '0' ? (
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: theme.spacing(2),
              fontWeight: 600,
              color: theme.palette.custom.forbole.blue,
              padding: theme.spacing(4, 0, 2, 0),
            }}
          >
            {t('estimated earning')}
          </Typography>
          <Box sx={styles.card}>
            <Box sx={styles.tokenResult}>
              <Box className="image">
                <Image
                  src={selectedToken.image}
                  objectFit="contain"
                  width="28px"
                  height="28px"
                  quality={100}
                />
              </Box>
              <Typography
                variant="h4"
                fontWeight="600"
                fontSize={theme.spacing(2.25)}
                color={theme.palette.custom.forbole.blue}
                paddingLeft={1}
              >
                {selectedToken.denom}
              </Typography>
            </Box>
            <Box sx={styles.amountResult}>
              <Typography
                variant="h4"
                fontWeight="600"
                fontSize={theme.spacing(2)}
                color={theme.palette.custom.forbole.blue}
                padding={theme.spacing(0, 0, 0.5, 0)}
              >
                {totalEarnings.monthlyEarnings.tokens}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="400"
                fontSize={theme.spacing(2)}
                color="#878787"
              >
                $ {totalEarnings.monthlyEarnings.amount} USD
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.buttonDiv}>
            <Button
              sx={styles.button}
              href={selectedToken.delegate || ''}
              disabled={!selectedToken.delegate}
              rel="noreferrer"
              target="_blank"
            >
              {t('stake with us!')}
            </Button>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Calculator;
