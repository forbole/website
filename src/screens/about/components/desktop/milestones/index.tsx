import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { awards } from '../../../config';

const MilestonesDesktop = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  let row = 0;
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="1200px"
      width="100%"
      height="180vh"
    >
      <Typography
        variant="h2"
        fontSize={theme.spacing(5)}
        pt={theme.spacing(20)}
        pb={theme.spacing(7)}
        textAlign="left"
        letterSpacing="0.0015em"
        fontWeight={700}
        color="primary.main"
      >
        {t('heading 2')}
      </Typography>
      <Box
        // display="grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 5fr 5fr',
          gridTemplateRows: 'repeat(5, 1fr)',
        }}
      >
        {awards.map((award) => {
          const { year, title, desc, timeline } = award;
          if (year) {
            row += 1;
          }
          return (
            <>
              <Box
                key={Math.random()}
                sx={{ gridRow: `${row} / span 1`, gridColumn: '1 / span 1' }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="left"
                  fontWeight={400}
                  fontSize={theme.spacing(2.5)}
                  color="primary.main"
                  display="flex"
                  justifyContent="flex-start"
                  height="100%"
                  alignItems="center"
                >
                  {year}
                </Typography>
              </Box>
              <Card
                sx={{
                  gridRow: `${row} / span 1`,
                  gridColumn: year ? '2 / span 1' : '3 / span 1',
                  color: 'primary.main',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: '2px solid rgba(195, 204, 226, 0.3)',
                  borderRadius: 2,
                  marginLeft: 3,
                  marginBottom: 3,
                  padding: theme.spacing(2.5, 2),
                  width: '448px',
                  height: '144px',
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="left"
                  fontWeight={600}
                  fontSize={theme.spacing(2.25)}
                >
                  {t(title)}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  textAlign="left"
                  fontWeight={400}
                  fontSize={theme.spacing(1.5)}
                >
                  {t(desc)}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  textAlign="left"
                  fontWeight={400}
                  fontSize={theme.spacing(1.5)}
                  color="rgba(255, 255, 255,0.5)"
                >
                  {t(timeline)}
                </Typography>
              </Card>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default MilestonesDesktop;
