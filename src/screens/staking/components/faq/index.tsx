import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { Card } from './components';
import { faq } from './config';

const FAQ = () => {
  const theme = useTheme();
  const { t } = useTranslation('staking');

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          textShadow:
            '0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)',
          fontWeight: 700,
          fontSize: theme.spacing(3),
          textAlign: 'center',
        }}
      >
        {t('faq')}
      </Typography>
      <Box>
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
          );
        })}
      </Box>
    </Box>
  );
};

export default FAQ;
