import React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { useWindowDimensions } from '@hooks';
import { statements } from '../../config';

const Trans = dynamic(() => import('next-translate/Trans'), { ssr: false });

const MissionItems = () => {
  const theme = useTheme();
  const { t } = useTranslation('mission');
  const { isDesktop } = useWindowDimensions();
  return (
    <Box
      sx={
        {
          // paddingTop: theme.spacing(12),
        }
      }
    >
      {statements.map((item) => {
        const { id, title, desc, image } = item;
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              [theme.breakpoints.up('laptop')]: {
                position: 'relative',
                flexDirection: id % 2 !== 0 ? 'row-reverse' : 'row',
              },
            }}
          >
            <Box
              height={isDesktop ? '450px' : '240px'}
              width={isDesktop ? '420px' : '222px'}
              sx={{
                '& img': {
                  height: isDesktop ? '450px' : '240px',
                  width: isDesktop ? '420px' : '222px',
                },
              }}
            >
              <img src={image} alt={`Mission${id}`} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h6"
                color="primary.main"
                fontWeight={600}
                fontSize={isDesktop ? theme.spacing(5) : theme.spacing(2.25)}
                textAlign={isDesktop ? 'left' : 'center'}
              >
                {t(title)}
              </Typography>
              {/* <Typography
                variant="body1"
                color="primary.main"
                fontWeight={600}
                fontSize={isDesktop ? theme.spacing(2.5) : theme.spacing(1.5)}
              >
                {t(desc)}
              </Typography> */}
              <Box
                sx={{
                  paddingTop: 3,
                  '& p': {
                    textAlign: isDesktop ? 'left' : 'center',
                  },
                }}
              >
                <Trans
                  i18nKey={t(desc)}
                  components={[
                    <Typography
                      variant="body1"
                      color="primary.main"
                      //   fontWeight={600}
                      // fontSize={
                      //   isDesktop ? theme.spacing(2.5) : theme.spacing(1.5)
                      // }
                      sx={{
                        display: 'inline-block',
                        fontSize: theme.spacing(1.5),
                        [theme.breakpoints.up('laptop')]: {
                          fontSize: theme.spacing(2.5),
                        },
                      }}
                    />,
                    <Typography
                      color="primary.main"
                      // fontSize={
                      //   isDesktop ? theme.spacing(2.5) : theme.spacing(1.5)
                      // }
                      fontWeight={900}
                      sx={{
                        display: 'inline-block',
                        fontSize: theme.spacing(1.5),
                        [theme.breakpoints.up('laptop')]: {
                          fontSize: theme.spacing(2.5),
                        },
                      }}
                    />,
                  ]}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MissionItems;
