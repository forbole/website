/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  FormControl,
  Grid,
  Typography,
  Select,
  Slider,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  useTheme,
} from '@mui/material';
import { getNetworkInfo } from '@src/utils/network_info';
import { InfoIcon } from '@icons';
import { calculatorKeys } from './config';
import { styles } from './styles';

const Calculator = (props: any) => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  const {
    selectedToken,
    setSelectedToken,
    handleCalculations,
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
        padding: theme.spacing(4, 3),
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
          {/* <InputLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={networkData[0].image}
                objectFit="contain"
                width="52px"
                height="52px"
                quality={100}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, fontSize: theme.spacing(2.5) }}
                >
                  {networkData[0].denom}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    fontSize: theme.spacing(1.5),
                    color: '#878787',
                  }}
                >
                  {networkData[0].label}
                </Typography>
              </Box>
            </Box>
          </InputLabel> */}
          <Select
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedToken}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: theme.palette.primary.main,
                  '& .MuiMenuItem-root': {
                    padding: 2,
                  },
                },
              },
            }}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <MenuItem value={networkData[0]}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  src={networkData[0].image}
                  objectFit="contain"
                  width="52px"
                  height="52px"
                  quality={100}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, fontSize: theme.spacing(2.5) }}
                  >
                    {networkData[0].denom}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 400,
                      fontSize: theme.spacing(1.5),
                      color: '#878787',
                    }}
                  >
                    {networkData[0].label}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {networkData.map((network) => (
              <MenuItem value={network}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Image
                    src={network.image}
                    objectFit="contain"
                    width="52px"
                    height="52px"
                    quality={100}
                  />
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
        <Grid container spacing={1}>
          <Grid item>
            <Typography
              variant="body1"
              sx={{
                fontSize: theme.spacing(2),
                fontWeight: 600,
                color: theme.palette.custom.forbole.blue,
                // padding: theme.spacing(4, 0, 1, 0),
              }}
            >
              0
            </Typography>
          </Grid>
          <Grid item mobile={8}>
            <Slider
              size="small"
              defaultValue={0}
              onChange={handleSliderChange}
              value={monthlyPeriods}
              step={1}
              min={0}
              max={12}
              sx={{
                '& .MuiSlider-thumb': {
                  height: 18,
                  width: 18,
                  background:
                    'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                  border:
                    '2px solid linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                  boxShadow: 'none',
                  '&:focus, &:hover, &.Mui-active': {
                    boxShadow: 'none',
                    '@media (hover: none)': {
                      boxShadow:
                        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                    },
                  },
                },
                '& .MuiSlider-track': {
                  height: 2.5,
                  background:
                    'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                },
                '& .MuiSlider-rail': {
                  color: '#76819B',
                  height: 2.5,
                },
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              sx={{
                fontSize: theme.spacing(2),
                fontWeight: 600,
                color: theme.palette.custom.forbole.blue,
                // padding: theme.spacing(4, 0, 1, 0),
              }}
            >
              12
            </Typography>
          </Grid>
          <Grid item sx={styles.input}>
            <OutlinedInput
              value={monthlyPeriods}
              size="small"
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
                    {t('month')}
                  </Typography>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Calculator;
