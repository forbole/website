import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { DotIcon } from '@icons';
import { styles } from './styles';
import { awards } from '../../../config';

const MilestonesMobile = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  return (
    <Box sx={styles.mnaBox}>
      <Typography
        variant="h5"
        component="div"
        textAlign="center"
        fontWeight={600}
        fontSize={theme.spacing(2.5)}
        mb={theme.spacing(5)}
        paddingTop={theme.spacing(7.5)}
      >
        {t('heading 2')}
      </Typography>
      {awards.map((award, i) => {
        const { year, title, desc, timeline } = award;
        return (
          <Box
            key={Math.random()}
            sx={{
              borderLeft:
                i === awards.length - 1
                  ? 'none'
                  : '2px solid rgba(195, 204, 226, 0.3)',
              height: '100%',
            }}
          >
            {year && (
              <Box display="flex" flexDirection="row" position="relative">
                <Box position="absolute" left={-6} top={-6}>
                  <DotIcon />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ position: 'absolute', left: '25px', top: ' -7px' }}
                >
                  {year}
                </Typography>
              </Box>
            )}
            <Card
              sx={{
                height: '180px',
                width: '300px',
                color: 'primary.main',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'transparent',
                border: '2px solid rgba(195, 204, 226, 1)',
                borderRadius: 2,
                marginLeft: 3,
                marginBottom: 3,
                marginTop: year ? 5 : 3,
                padding: theme.spacing(2.5, 2),
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
          </Box>
        );
      })}
    </Box>
  );
};

export default MilestonesMobile;
