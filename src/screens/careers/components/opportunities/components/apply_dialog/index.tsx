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
    handleFileUpload,
    handleResumeClear,
    resumeName,
  } = useApplyForm({
    title,
  });

  console.log('inputs', inputs);

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
              placeholder={t('email')}
              name="email"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.email}
              helperText={
                inputs.email.length > 0 && !validator.isEmail(inputs.email)
                  ? 'invalid input'
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
                    inputs.email.length > 0 && !validator.isEmail(inputs.email)
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
            <TextField
              placeholder={t('phone')}
              name="phone"
              id="outlined-basic"
              onChange={handleInputChange}
              variant="outlined"
              value={inputs.phone}
              helperText={
                inputs.phone.length > 1 &&
                !validator.isMobilePhone(inputs.phone)
                  ? 'invalid input'
                  : ''
              }
              InputProps={{
                endAdornment: inputs.phone.length > 0 && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClear('phone')}
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
                    inputs.phone.length > 1 &&
                    !validator.isMobilePhone(inputs.phone)
                      ? '1px solid red'
                      : '1px solid rgba(255, 255, 255, 1)',
                  '& fieldset': {
                    borderColor:
                      inputs.phone.length > 1 &&
                      !validator.isMobilePhone(inputs.phone)
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
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {inputs.resume && (
              <Box color="primary.main">
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
