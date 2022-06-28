import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { SearchIcon } from '@icons';
import { Opening } from './components';

const Opportunities = ({ jobPosts }: any) => {
  const { t } = useTranslation('careers');
  const theme = useTheme();

  const openingsData = jobPosts.posts;

  // search bar functionality
  const [inputText, setInputText] = React.useState('');

  const inputHandler = (e: { target: { value: string } }) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = openingsData.filter((el: any) => {
    // if no input the return the original
    if (inputText === '') {
      return el;
    }
    // return the items which contains the user input
    return el.title.toLowerCase().includes(inputText);
  });

  return (
    <Box>
      <Box
        display="flex"
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.up('laptop')]: {
            width: '1200px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 4.5,
          },
        }}
      >
        <Typography
          variant="h3"
          color="primary.main"
          sx={{
            fontWeight: 600,
            fontSize: theme.spacing(2.5),
            textAlign: 'center',
            paddingBottom: theme.spacing(2.5),
            [theme.breakpoints.up('laptop')]: {
              fontSize: theme.spacing(4),
              paddingBottom: 0,
            },
          }}
        >
          {t('job opportunities')}
        </Typography>
        <TextField
          placeholder={t('search')}
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            paddingBottom: theme.spacing(4),
            width: '250px',
            '.MuiOutlinedInput-root': {
              color: 'primary.main',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: theme.spacing(1.5),
              border: '1px solid rgba(255, 255, 255, 0.5)',
            },
            [theme.breakpoints.up('laptop')]: {
              paddingBottom: 0,
            },
          }}
        />
      </Box>
      <Box display="flex" flexDirection="column">
        {inputText === '' ? (
          <Box
            sx={{
              [theme.breakpoints.up('laptop')]: {
                height: '1000px',
              },
            }}
          >
            {openingsData.slice(1, 3).map((item: any, i: any) => {
              return (
                <Box key={i} sx={{ paddingBottom: theme.spacing(3) }}>
                  <Opening
                    key={i}
                    title={item.title}
                    description={item.customExcerpt}
                    slug={item.slug}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              [theme.breakpoints.up('laptop')]: {
                height: '1000px',
              },
            }}
          >
            {filteredData.slice(0, 2).map((item: any, i: any) => {
              return (
                <Box
                  sx={{
                    paddingBottom: theme.spacing(3),
                  }}
                >
                  <Opening
                    key={i}
                    title={item.title}
                    description={item.customExcerpt}
                    slug={item.slug}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Opportunities;
