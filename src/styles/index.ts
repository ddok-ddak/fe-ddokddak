import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7184',
      light: '#FFDCE1',
      dark: '#FFA2AE',
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
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#95989a',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    text: {
      primary: '#222222',
      secondary: '#b7b7b7',
      disabled: ''
    }
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
