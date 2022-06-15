/* eslint-disable no-unused-expressions */
import React from 'react';
import { styled, Switch, SwitchProps } from '@mui/material';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { Theme } from '@recoil/settings/types';
import { writeTheme } from '@recoil/settings';

const ThemeSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 47,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(21px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'rgba(54, 33, 135, 1)',
        backgroundImage: 'url(/images/assets/icon_dark_mode.svg)',
        backgroundPosition: '3%',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        // opacity: 0.5,
        // backgroundImage: 'url(/images/assets/icon_light_mode.svg)',
        // backgroundPosition: '1%',
        // backgroundRepeat: 'no-repeat',
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'rgba(54, 33, 135, 1)',
    backgroundImage: 'url(/images/assets/icon_light_mode.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '97%',
    // right: 12,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    // '&:before': {
    //   backgroundImage: 'url(/images/assets/icon_dark_mode.svg)',
    //   left: 12,
    // },
    // '&:after': {
    //   //   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    //   //     theme.palette.getContrastText(theme.palette.primary.main)
    //   //   )}" d="M19,13H5V11H19V13Z" /></svg>')`,
    //   backgroundImage: 'url(/images/assets/icon_light_mode.svg)',
    //   right: 12,
    // },
  },
}));

export default function ThemeModeSwitch() {
  const [theme, setTheme] = useRecoilState(writeTheme) as [
    Theme,
    SetterOrUpdater<Theme>
  ];

  const handleChangeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  React.useEffect(() => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  return <ThemeSwitch onChange={() => handleChangeTheme()} />;
}
