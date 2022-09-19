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
    <Box>
      {statements.map((item) => {
        const { id, title, desc, image } = item;
        let svgStyle = {};
        let boxStyle = {};
        switch (id) {
          case 1:
            svgStyle = { transform: 'translate(10%, 20%)' };
            break;
          case 2:
            svgStyle = { transform: 'translateY(-20%)' };
            break;
          case 3:
            svgStyle = { transform: 'translate(20%, -40%)' };
            break;
          case 4:
            svgStyle = { transform: 'translate(0%, -55%)' };
            boxStyle = { transform: 'translate(0px, -50%)' };
            break;
          case 5:
            svgStyle = { transform: 'translate(10%, -75%)' };
            boxStyle = { transform: 'translateY(-85%)' };
            break;
          case 6:
            svgStyle = { transform: 'translate(0%, -85%)' };
            boxStyle = { transform: 'translateY(-150%)' };
            break;
          default:
            svgStyle = {};
            boxStyle = {};
        }
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              [theme.breakpoints.up('laptop')]: {
                position: 'relative',
                flexDirection: id % 2 !== 0 ? 'row-reverse' : 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: id >= 3 ? 'flex-start' : 'center',
              },
            }}
          >
            <Box
              height={isDesktop ? '600px' : '240px'}
              width={isDesktop ? '600px' : '222px'}
              sx={{
                '& img': {
                  height: isDesktop ? '600px' : '240px',
                  width: isDesktop ? '600px' : '222px',
                },
                [theme.breakpoints.up('laptop')]: {
                  '& img': svgStyle,
                  width: '60%',
                },
              }}
            >
              <img src={image} alt={`Mission${id}`} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up('desktop')]: boxStyle,
                [theme.breakpoints.up('laptop')]: {
                  width: '30%',
                },
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
                      sx={{
                        display: 'inline',
                        fontSize: theme.spacing(1.5),
                        [theme.breakpoints.up('laptop')]: {
                          fontSize: theme.spacing(2.5),
                        },
                      }}
                    />,
                    <Typography
                      color="primary.main"
                      fontWeight={700}
                      sx={{
                        display: 'inline',
                        fontSize: theme.spacing(1.5),
                        [theme.breakpoints.up('laptop')]: {
                          fontSize: theme.spacing(2.5),
                          display: 'inline',
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
