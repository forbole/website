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
  return (
    <Card
      sx={{
        background: theme.palette.primary.main,
        boxShadow:
          '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
        borderRadius: theme.spacing(3),
      }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <CardContent
          sx={{
            padding: theme.spacing(3),
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(5),
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
            <FormControl sx={{}}>
              <InputLabel id="demo-simple-select-autowidth-label">
                {t(options[0])}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputs.option}
                IconComponent={(props) => <ExpandIcon {...props} />}
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
                onChange={(e) => {
                  const { value } = e.target;
                  setInputs((input) => ({
                    ...input,
                    option: value,
                  }));
                }}
              >
                <MenuItem disabled value="">
                  <em>{t(options[0])}</em>
                </MenuItem>
                {options.slice(1).map((option) => (
                  <MenuItem value={t(option)}>{t(option)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={styles.buttonDiv}>
          <Button type="submit" disabled={!canSubmit} sx={styles.button}>
            {t('get in touch!')}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ContactCard;
