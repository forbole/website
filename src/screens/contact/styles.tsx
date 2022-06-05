import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  gridBox: (theme) => ({
    [theme.breakpoints.up('laptop')]: {
      display: 'grid',
      gridTemplateColumns: '6fr 4fr',
      gridGap: 0,
    },
  }),
};
