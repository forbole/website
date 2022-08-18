import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Card } from './components';
import { faq } from './config';

const FAQ = () => {
  const theme = useTheme();
  const { t } = useTranslation('staking');

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textShadow:
              '0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)',
            fontWeight: 700,
            fontSize: theme.spacing(3),
            textAlign: 'center',
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up('laptop')]: {
              fontSize: theme.spacing(5),
            },
          }}
        >
          {t('faq')}
        </Typography>
        <Box>
          <Grid container spacing={2} columns={12}>
            {faq.map((x) => {
              const {
                question,
                para1,
                para2,
                trans,
                para3,
                desc,
                bullet1,
                bullet2,
                bullet3,
              } = x;
              return (
                <Grid item mobile={12} laptop={6}>
                  <Card
                    question={question}
                    para1={para1}
                    para2={para2}
                    para3={para3}
                    trans={trans}
                    desc={desc}
                    bullet1={bullet1}
                    bullet2={bullet2}
                    bullet3={bullet3}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
