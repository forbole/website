/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ExpandIcon } from '@icons';
import { styles } from './styles';
import useContactCard from './hooks';
import { options } from './config';

const ContactCard = () => {
  const theme = useTheme();
  const { t } = useTranslation('staking');
  const { handleSubmit, handleInputChange, inputs, setInputs, canSubmit } =
    useContactCard();

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <Card
      sx={{
        background: theme.palette.primary.main,
        boxShadow:
          '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
        borderRadius: theme.spacing(3),
        maxWidth: '100%',
        margin: 'auto',
        [theme.breakpoints.up('laptop')]: {
          maxWidth: '70%',
        },
      }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <CardContent
          sx={{
            padding: theme.spacing(3),
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(5),
              gridGap: theme.spacing(5),
              display: 'grid',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridTemplateColumns: 'repeat(6, 1fr)',
            },
          }}
        >
          <Box sx={styles.nameBox}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="left"
              fontWeight={600}
              fontSize={theme.spacing(2)}
              pb={theme.spacing(1)}
            >
              {t('your name')}
            </Typography>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="name"
              placeholder={t('name')}
              onChange={handleInputChange}
              value={inputs.name}
              sx={styles.inputField}
            />
          </Box>
          <Box sx={styles.mailBox}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="left"
              fontWeight={600}
              fontSize={theme.spacing(2)}
              pb={theme.spacing(1)}
            >
              {t('your email')}
            </Typography>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              name="email"
              placeholder={t('email')}
              onChange={handleInputChange}
              value={inputs.email}
              sx={styles.inputField}
            />
          </Box>
          <Box sx={styles.select}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="left"
              fontWeight={600}
              fontSize={theme.spacing(2)}
              pb={theme.spacing(1)}
            >
              {t('how can we help you')}
            </Typography>
            <FormControl>
              {inputs.option === '' ? (
                <InputLabel shrink={false} focused={false} id="item_type_label">
                  {t(options[0])}
                </InputLabel>
              ) : null}
              <Select
                variant="outlined"
                open={isOpen}
                onOpen={() => {
                  setIsOpen(true);
                }}
                onClose={() => {
                  setIsOpen(false);
                }}
                value={inputs.option}
                IconComponent={(props) => <ExpandIcon {...props} />}
                MenuProps={{
                  variant: 'menu',
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      bgcolor: theme.palette.primary.main,
                      marginTop: 1,
                      boxShadow:
                        '0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)',
                      borderRadius: 1,
                      '& .MuiMenuItem-root': {
                        padding: 2,
                        '&:hover': {
                          background:
                            ' linear-gradient(286.17deg, rgba(212, 49, 238, 0.24) 0%, rgba(255, 66, 107, 0.24) 100%)',
                        },
                      },
                    },
                  },
                }}
                onChange={(e) => {
                  const { value } = e.target;
                  setInputs((input) => ({
                    ...input,
                    option: value,
                  }));
                }}
              >
                {options.slice(1).map((option, i) => (
                  <MenuItem key={i} value={t(option)}>
                    {t(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <CardActions sx={styles.buttonDiv}>
            <Button type="submit" disabled={!canSubmit} sx={styles.button}>
              {t('get in touch!')}
            </Button>
          </CardActions>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCard;
