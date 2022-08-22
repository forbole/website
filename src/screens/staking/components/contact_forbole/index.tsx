import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  ListItem,
  useTheme,
} from '@mui/material';
import { ContactCard } from './components';

const Trans = dynamic(() => import('next-translate/Trans'), { ssr: false });

const ContactForbole = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          padding: theme.spacing(5, 3),
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
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: 'center',
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up('laptop')]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
        >
          {t('contact Forbole')}
        </Typography>
        <ContactCard />
      </Box>
    </Box>
  );
};

export default ContactForbole;
