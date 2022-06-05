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
        <CardContent>
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
                // variant="outlined"
                name="name"
                label={t('your name')}
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
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                // variant="outlined"
                name="email"
                label={t('email')}
                onChange={handleInputChange}
                value={inputs.email}
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
                sx={styles.inputField}
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
                // variant="outlined"
                name="message"
                label={t('message')}
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
