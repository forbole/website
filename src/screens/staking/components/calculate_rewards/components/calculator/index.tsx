import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  FormControl,
  Typography,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { getNetworkInfo } from '@src/utils/network_info';
import { calculatorKeys } from './config';
import { styles } from './styles';

const Calculator = (props: any) => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  const { selectedToken, setSelectedToken } = props;
  const networkData = calculatorKeys.map((x: string | number) =>
    getNetworkInfo(x)
  );
  React.useEffect(() => {
    if (selectedToken === '') {
      setSelectedToken(networkData[0]);
    }
  }, [selectedToken]);

  return (
    <Box
      sx={{
        background:
          'linear-gradient(269.66deg, rgba(2, 158, 225, 0.4) -12.39%, rgba(2, 38, 225, 0.2) 99.38%), rgba(255, 255, 255, 0.8)',
        boxShadow:
          '10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(6px)',
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
    </Box>
  );
};

export default Calculator;
