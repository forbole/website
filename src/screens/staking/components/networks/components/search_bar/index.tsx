/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { getNetworkInfo } from '@src/utils/network_info';
import { SearchIcon } from '@icons';
import { networkKeys, NetworkOptionType, searchNetwork } from './config';

const SearchBar = () => {
  const theme = useTheme();
  const networkData = networkKeys.map((x: string) => getNetworkInfo(x));
  return (
    <Autocomplete
      sx={{ width: 300 }}
      // {...networkProps}
      //   freeSolo
      // id="free-solo-dialog-demo"
      // options={networkData.map(({ name }) => name)}
      // options={searchNetwork}
      options={networkData}
      // options={Object.keys(networkData).map((option: number) => {
      //   console.log('opts', option);
      //   return networkData[option];
      // })}
      // options={ne}
      // getOptionLabel={option.map((opt, i) => opt[i].name)}
      // fullWidth
      getOptionLabel={(option) => {
        console.log('get label', option);
        return option.name;
      }}
      //   filterOptions={(options: string[], { inputValue }: any) => {
      //     return options.filter((o) =>
      //       o.name.toLowerCase().includes(inputValue.toLowerCase())
      //     );
      //   }}
      renderOption={(props, option, state) => {
        console.log('network', option);
        return (
          <Box
            component="li"
            sx={{
              // testing
              height: '100%',
              background: theme.palette.common.white,
              ' > p': {
                color: 'black',
              },
              '& > img': {
                mr: 2,
                flexShrink: 0,
                boxShadow:
                  '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
              },
            }}
            {...props}
          >
            <img
              loading="lazy"
              width="24"
              src={option.image}
              srcSet={`${option.image} 2x`}
              alt=""
            />
            <p>{option.name}</p>
          </Box>
        );
      }}
      //   filterOptions={(options: string[], { inputValue }: any) =>
      //     options.filter((o) =>
      //       (networkData[o].name || '')
      //         .toLowerCase()
      //         .includes(inputValue.toLowerCase())
      //     )
      //   }
      // issues with this renderInput prop breaking the Autocomplete component:
      // renderInput={(params) => (
      //   <TextField
      //     {...params}
      //     variant="outlined"
      //     InputProps={{
      //       startAdornment: (
      //         <InputAdornment position="start">
      //           <SearchIcon />
      //         </InputAdornment>
      //       ),
      //     }}
      //   />
      // )}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};

export default SearchBar;
