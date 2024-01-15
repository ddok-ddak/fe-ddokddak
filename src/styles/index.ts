import { Color } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import type { } from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    grey?: ColorPartial;
    pink?: ColorPartial;
    calendar?: any;
    chart?: any;
    button?: any;
    popup?: any;
  }
  interface Palette {
    grey?: Color;
    pink?: Color;
    calendar?: any;
    chart?: any;
    button?: any;
    popup?: any;
  }
}

const greyPalette = {
  50: '',
  100: '#F5F5F5',
  200: '#E8E8E8',
  300: '#DDDDDD',
  400: '#B7B7B7',
  500: '#949494',
  600: '#4B4B4B',
  700: '#222222',
  800: '',
  900: '',
};

const pinkPalette = {
  50: '',
  100: '#FFE4E8',
  200: '#FFDCE1',
  300: '#FFC5CC',
  400: '#FFB4BE',
  500: '#FFA2AE',
  600: '#FF8999',
  700: '#FF7184',
  800: '',
  900: '',
};

export const theme = createTheme({
  typography: {
  },
  palette: {
    grey: greyPalette,
    pink: pinkPalette,
    primary: {
      main: pinkPalette[700],
      light: pinkPalette[200],
      dark: pinkPalette[500],
    },
    secondary: {
      main: '#673ab7',
      light: '#ede7f6',
      dark: '#5e35b1',
    },
    success: {
      main: '#00e676',
      light: '#b9f6ca',
      dark: '#00c853',
    },
    error: {
      main: '#f44336',
      light: '#ef9a9a',
      dark: '#c62828',
    },
    warning: {
      main: '#ffe57f',
      light: '#fff8e1',
      dark: '#ffc107',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    text: {
      primary: greyPalette[700],
      secondary: greyPalette[400],
      disabled: ''
    },
    calendar: {
      currSun: '#FF4444',
      outSun: '#FF9E9E',
      currSat: '#3B66FF',
      outSat: '#3B66FF',
      currDay: '#4B4B4B',
      outCay: '#B3B3B3',
    },
    chart: {
      customBackground: '#FFF4F6',
    },
    button: {
      blue: '#4F75FF',
    },
    popup: {
      background: '#D1F1E4',
      icon: '#16B978',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: 'none',
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          display: 'none',
        },
        label: {
          display: 'none',
        },
      },
    },
    MuiDayPicker: {
      styleOverrides: {
        header: {
          display: 'none',
        },
        monthContainer: {
          margin: '0px 0 0 0',
        },
        weekContainer: {
          height: '5vh',
          margin: '3% 2%',
          ' div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
            padding: '1%',
          },
          '> div > div': {
            fontSize: '10px',
          },
        },
      },
    },
    MuiMonthPicker: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
    MuiYearPicker: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: 'none',
        },
      },
    },
  },
});
