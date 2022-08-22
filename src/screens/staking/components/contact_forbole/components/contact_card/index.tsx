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
import { styles } from './styles';
import ContactFormProps from './types';
import useContactCard from './hooks';

const ContactCard = () => {
  const theme = useTheme();
  const { t } = useTranslation('staking');
  const {
    handleSubmit,
    handleInputChange,
    handleClear,
    handleMouseDownClear,
    inputs,
    setInputs,
    canSubmit,
  } = useContactCard();
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
              // InputProps={{
              //   endAdornment: inputs.name.length > 0 && (
              //     <InputAdornment position="end">
              //       <IconButton
              //         onClick={() => handleClear('name')}
              //         onMouseDown={handleMouseDownClear}
              //       >
              //         <ClearIcon />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
              sx={styles.inputField}
            />
          </Box>
        </CardContent>
      </form>
    </Card>
  );
};

export default ContactCard;
