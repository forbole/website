/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
  DialogContent,
  DialogActions,
} from '@mui/material';
import validator from 'validator';
import { CloseIcon, ClearIcon, UploadIcon } from '@icons';
import { useWindowDimensions } from '@src/hooks';
import { styles } from './styles';
import useApplyForm from './hooks';

interface ApplyDialogProps {
  setting: { open: boolean; title: string };
  //   title: string;
  onClose(): void;
}

const ApplyDialog: React.FC<ApplyDialogProps> = ({ setting, onClose }) => {
  const { t } = useTranslation('careers');
  const theme = useTheme();
  const { isMobile } = useWindowDimensions();
  const { title, open } = setting;
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    canSubmit,
    handleClear,
    handleMouseDownClear,
    handleResumeUpload,
    handleResumeClear,
    handleLetterUpload,
    handleLetterClear,
    resumeName,
    letterName,
    emailError,
    setEmailError,
    numberError,
    setNumberError,
  } = useApplyForm({
    title,
  });

  const emailRef = React.useRef(null);
  const numberRef = React.useRef(null);
  const handleMouseOut = (currentRef: any) => {
    if (document.activeElement !== currentRef) {
      inputs.email.length > 0 && !validator.isEmail(inputs.email)
        ? setEmailError(true)
        : setEmailError(false);
      inputs.countryCode.length > 0 &&
      inputs.number.length > 0 &&
      !validator.isMobilePhone(`+${inputs.countryCode + inputs.number}`)
        ? setNumberError(true)
        : setNumberError(false);
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      inputs.email.length > 0 && !validator.isEmail(inputs.email)
        ? setEmailError(true)
        : setEmailError(false);
      inputs.countryCode.length > 0 &&
      inputs.number.length > 0 &&
      !validator.isMobilePhone(`+${inputs.countryCode + inputs.number}`)
        ? setNumberError(true)
        : setNumberError(false);
    }
  };

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth="laptop"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      sx={styles.dialog}
      // sx={{ backgroundColor: 'rgba(29, 30, 34, 0.5)' }}
    >
      <IconButton sx={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle
        color="primary.main"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          paddingTop: theme.spacing(10),
          fontSize: theme.spacing(3),
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(4),
          },
        }}
      >
        {t('apply title')}
      </DialogTitle>
      <form noValidate encType="multipart/form-data" onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={styles.inputField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('first name')}
            </Typography>
            <TextField
              placeholder={t('first name')}
              name="firstName"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.firstName}
              InputProps={{
                endAdornment: inputs.firstName.length > 0 && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClear('firstName')}
                      onMouseDown={handleMouseDownClear}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
          </Box>
          <Box sx={styles.inputField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('last name')}
            </Typography>
            <TextField
              placeholder={t('last name')}
              name="lastName"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.lastName}
              InputProps={{
                endAdornment: inputs.lastName.length > 0 && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClear('lastName')}
                      onMouseDown={handleMouseDownClear}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
          </Box>
          <Box sx={styles.inputField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('email')}
            </Typography>
            <TextField
              ref={emailRef}
              onMouseOut={() => handleMouseOut(emailRef.current)}
              onKeyPress={keyPressHandler}
              onKeyDown={keyPressHandler}
              placeholder={t('email')}
              name="email"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.email}
              helperText={emailError ? 'invalid input' : ''}
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
                  border: emailError
                    ? '1px solid red'
                    : '1px solid rgba(255, 255, 255, 1)',
                  '& fieldset': {
                    borderColor: emailError ? 'red' : 'white',
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
          <Box sx={styles.inputField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('phone')}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex' }}>
              <TextField
                placeholder={t('country code')}
                name="countryCode"
                id="outlined-basic"
                onChange={handleInputChange}
                variant="outlined"
                value={inputs.countryCode}
                helperText={numberError ? 'invalid input' : ''}
                InputProps={{
                  endAdornment: inputs.countryCode.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClear('countryCode')}
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
                  width: '50%',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'transparent',
                    borderRadius: theme.spacing(1),
                    border: numberError
                      ? '1px solid red'
                      : '1px solid rgba(255, 255, 255, 1)',
                    '& fieldset': {
                      borderColor: numberError ? 'red' : 'white',
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
                  [theme.breakpoints.up('laptop')]: {
                    width: '30%',
                  },
                }}
              />
              <TextField
                ref={numberRef}
                onMouseOut={() => handleMouseOut(numberRef.current)}
                onKeyPress={keyPressHandler}
                onKeyDown={keyPressHandler}
                placeholder={t('number')}
                name="number"
                id="outlined-basic"
                onChange={handleInputChange}
                variant="outlined"
                value={inputs.number}
                helperText={numberError ? 'invalid input' : ''}
                InputProps={{
                  endAdornment: inputs.number.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClear('number')}
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
                  width: '50%',
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'transparent',
                    borderRadius: theme.spacing(1),
                    border: numberError
                      ? '1px solid red'
                      : '1px solid rgba(255, 255, 255, 1)',
                    '& fieldset': {
                      borderColor: numberError ? 'red' : 'white',
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
                  [theme.breakpoints.up('laptop')]: {
                    width: '70%',
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={styles.inputField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('message')}
            </Typography>
            <TextField
              multiline
              rows={4}
              placeholder={t('message')}
              name="message"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
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
              sx={styles.textField}
            />
          </Box>
          <Box sx={styles.fileField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('cv')}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{
                border: '1px solid rgba(235, 238, 245, 1)',
                borderRadius: '200px',
                fontSize: theme.spacing(2),
                '& span': {
                  marginRight: theme.spacing(0.5),
                },
              }}
            >
              {t('upload')}
              <input
                type="file"
                name="resume"
                hidden
                accept="application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeUpload}
              />
            </Button>
            {inputs.resume && (
              <Box
                color="primary.main"
                fontWeight={400}
                fontSize={theme.spacing(2)}
              >
                {resumeName}
                <IconButton
                  onClick={() => handleResumeClear()}
                  onMouseDown={handleMouseDownClear}
                >
                  <ClearIcon />
                </IconButton>{' '}
              </Box>
            )}
          </Box>
          <Box sx={styles.fileField}>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
                paddingBottom: theme.spacing(2),
              }}
            >
              {t('cover letter')}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{
                border: '1px solid rgba(235, 238, 245, 1)',
                borderRadius: '200px',
                fontSize: theme.spacing(2),
                '& span': {
                  marginRight: theme.spacing(0.5),
                },
              }}
            >
              {t('upload')}
              <input
                type="file"
                name="coverLetter"
                accept="application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={handleLetterUpload}
              />
            </Button>
            {inputs.coverLetter && (
              <Box
                color="primary.main"
                fontWeight={400}
                fontSize={theme.spacing(2)}
              >
                {letterName}
                <IconButton
                  onClick={() => handleLetterClear()}
                  onMouseDown={handleMouseDownClear}
                >
                  <ClearIcon />
                </IconButton>{' '}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={styles.buttonDiv}>
          <Button type="submit" disabled={!canSubmit} sx={styles.button}>
            {t('submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApplyDialog;
