/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
} from '@mui/material';
import validator from 'validator';
import { ClearIcon } from '@icons';
import { styles } from './styles';

interface ContactFormProps {
  inputs: {
    name: string;
    message: string;
    email: string;
  };
  handleInputChange: (event: any) => void;
  handleMouseDownClear: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleSubmit: (event: any) => void;
  handleClear: (field: any) => void;
  canSubmit: boolean;
}

const ContactForm = (props: ContactFormProps) => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  // const { width } = useWindowDimensions();
  const {
    inputs,
    handleInputChange,
    handleMouseDownClear,
    handleSubmit,
    handleClear,
    canSubmit,
  } = props;
  return (
    <Card sx={styles.formBox}>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent
          sx={{
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(5),
            },
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="left"
            fontWeight={600}
            fontSize={theme.spacing(2.5)}
            mb={theme.spacing(3.5)}
          >
            {t('send us a message')}
          </Typography>
          <Box sx={styles.formDiv}>
            <Box sx={styles.nameBox}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                textAlign="left"
                fontWeight={600}
                fontSize={theme.spacing(2.5)}
                mb={theme.spacing(2)}
              >
                {t('your name')}
              </Typography>
              <TextField
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                name="name"
                placeholder={t('your name')}
                onChange={handleInputChange}
                value={inputs.name}
                InputProps={{
                  endAdornment: inputs.name.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClear('name')}
                        onMouseDown={handleMouseDownClear}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={styles.inputField}
              />
            </Box>
            <Box sx={styles.emailBox}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                textAlign="left"
                fontWeight={600}
                fontSize={theme.spacing(2.5)}
                mb={theme.spacing(2)}
              >
                {t('email')}
              </Typography>
              <TextField
                id="demo-helper-text-aligned-no-helper"
                name="email"
                placeholder={t('email')}
                onChange={handleInputChange}
                value={inputs.email}
                helperText={
                  inputs.email.length > 0 && !validator.isEmail(inputs.email)
                    ? 'invalid email'
                    : ''
                }
                InputProps={{
                  endAdornment: inputs.email.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClear('email')}
                        onMouseDown={handleMouseDownClear}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  color: theme.palette.primary.main,
                  alignSelf: 'stretch',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'transparent',
                    borderRadius: theme.spacing(1),
                    border:
                      inputs.email.length > 0 &&
                      !validator.isEmail(inputs.email)
                        ? '1px solid red'
                        : '1px solid rgba(255, 255, 255, 1)',
                    '& fieldset': {
                      borderColor:
                        inputs.email.length > 0 &&
                        !validator.isEmail(inputs.email)
                          ? 'red'
                          : 'white',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: 'red',
                  },
                  // important class for styling textfield when focused:
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    borderColor: 'transparent',
                  },
                }}
              />
            </Box>
            <Box sx={styles.messageBox}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                textAlign="left"
                fontWeight={600}
                fontSize={theme.spacing(2.5)}
                mb={theme.spacing(2)}
              >
                {t('message')}
              </Typography>
              <TextField
                multiline
                rows={4}
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                name="message"
                placeholder={t('message')}
                onChange={handleInputChange}
                value={inputs.message}
                InputProps={{
                  endAdornment: inputs.message.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClear('message')}
                        onMouseDown={handleMouseDownClear}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={styles.inputField}
              />
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={styles.buttonDiv}>
          <Button type="submit" disabled={!canSubmit} sx={styles.button}>
            {t('submit')}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ContactForm;
