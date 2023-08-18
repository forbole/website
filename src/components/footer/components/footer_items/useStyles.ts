import { css, useTheme } from '@mui/material';

const useStyles = () => {
    const theme = useTheme();
    return {
        word: css({
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '590',
            lineHeight: '20px',
            letterSpacing: '0.336px',
            "&:hover": {
                cursor: "pointer",
                color: theme.palette.custom.forbole.purple,
            }
        })
    };
};

export default useStyles;
