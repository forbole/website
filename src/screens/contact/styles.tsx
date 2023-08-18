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
  iconBox:(theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'40px',
    height: "40px",
    borderRadius: "50%",
    background: "#2A1A6A",
    boxShadow:'4px 8px 24px 0px rgba(116, 81, 255, 0.28)'
  })
};
