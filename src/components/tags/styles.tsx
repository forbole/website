import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  tagsContainer: (theme) => ({
    padding: theme.spacing(7, 1.5),
    color: theme.palette.primary.main,
    '& h3': {
      fontWeight: 700,
      fontSize: theme.spacing(3),
      paddingBottom: theme.spacing(3.5),
    },
  }),
  tagCSS: {
    '& ul': {
      listStyleType: 'none',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  listCSS: (theme) => ({
    display: 'inline-block',
    padding: theme.spacing(1, 2),
    background: theme.palette.secondary.main,
    borderRadius: theme.spacing(25),
    margin: theme.spacing(0, 1, 1, 0),
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: theme.spacing(2),
    },
    '&:hover': {
      background: theme.palette.custom.forbole.purple,
    },
  }),
};
