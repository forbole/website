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
// import { useWindowDimensions } from '@src/hooks';
import { ClearIcon } from '@icons';
import useContactForm from './hooks';
import { styles } from './styles';

const ContactForm = () => {
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
  } = useContactForm();
  console.log('main', inputs);
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
          {/* the div for the form */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'flex-start',
              [theme.breakpoints.up('laptop')]: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: 'repeat(2, 1fr)',
                gridGap: theme.spacing(5),
              },
            }}
          >
            {/* the div for the name input field */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                [theme.breakpoints.up('laptop')]: {
                  gridRow: '1 / span 1',
                  gridColumn: '1 / span 1',
                },
              }}
            >
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
                sx={{
                  color: theme.palette.primary.main,
                  alignSelf: 'stretch',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& label': {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              />
            </Box>
            {/* the div for the email address input field */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                [theme.breakpoints.up('laptop')]: {
                  gridRow: '1 / span 1',
                  gridColumn: '2 / span 1',
                },
              }}
            >
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
                sx={{
                  color: theme.palette.primary.main,
                  alignSelf: 'stretch',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& label': {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              />
            </Box>
            {/* the div for the message input field */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                [theme.breakpoints.up('laptop')]: {
                  gridRow: '2 / span 1',
                  gridColumn: '1 / span 2',
                },
              }}
            >
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
                sx={{
                  color: theme.palette.primary.main,
                  alignSelf: 'stretch',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& label': {
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              />
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'block',
            [theme.breakpoints.up('laptop')]: {
              display: 'none',
            },
          }}
        >
          <Button
            type="submit"
            disabled={!canSubmit}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: theme.spacing(1.5, 2),
              backgroundColor: 'secondary.main',
              borderRadius: theme.spacing(25),
              fontWeight: 600,
              fontSize: theme.spacing(2),
              letterSpacing: '0.036em',
            }}
          >
            {t('submit')}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ContactForm;
