/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { LocationIcon, MailIcon } from '@icons';
import { styles } from './styles';

interface ContactInfoProps {
  canSubmit: boolean;
  handleSubmit: (event: any) => void;
}

const ContactInfo = (props: ContactInfoProps) => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  const { handleSubmit, canSubmit } = props;
  return (
    <Card sx={styles.infoBox}>
      <form noValidate onSubmit={handleSubmit} style={{ height: '100%' }}>
        <CardContent
          sx={{
            height: '100%',
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(5),
            },
          }}
        >
          <Box sx={styles.flexBox}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="left"
              fontWeight={600}
              fontSize={theme.spacing(2.5)}
              mb={theme.spacing(3.5)}
            >
              {t('contact info')}
            </Typography>
            {/* <Box sx={styles.content}>
              <LocationIcon />
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign="left"
                fontWeight={400}
                fontSize={theme.spacing(1.75)}
              >
                {t('address')}
              </Typography>
            </Box> */}
            <Box sx={styles.content}>
              <MailIcon />
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign="left"
                fontWeight={400}
                fontSize={theme.spacing(1.75)}
              >
                {t('info email')}
              </Typography>
            </Box>
            <Box>
              <CardActions sx={styles.buttonDiv}>
                <Button type="submit" disabled={!canSubmit} sx={styles.button}>
                  {t('submit')}
                </Button>
              </CardActions>
            </Box>
          </Box>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactInfo;
