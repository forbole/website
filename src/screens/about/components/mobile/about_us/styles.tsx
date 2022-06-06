import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  contentBox: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100%',
    padding: theme.spacing(0, 3),
    paddingBottom: 5.5,
  }),
};
