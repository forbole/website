/* eslint-disable*/
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' { 
    interface Custom {
        background: { default: string };
        forbole: {
            red: '#BD081C',
        },
    }
    interface PaletteOptions {
        custom?: Custom;
    }
    interface Palette {
        custom: Custom;
    }
}