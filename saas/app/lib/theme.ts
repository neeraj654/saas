import { createMuiTheme } from '@material-ui/core/styles';

const themeDark = createMuiTheme({
  palette: {
    primary: { main: '#aa00ff' },
    secondary: { main: '#ab47bc' },
    error: { main: '#d32f2f' },
    warning: { main: '#f57c00' },
    info: { main: '#0288d1' },
    success: { main: '#388e3c' },
    type: 'dark',
    background: { default: '#0d1117' },
    text: {
      primary: '#c9d1d9',
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});

const themeLight = createMuiTheme({
  palette: {
    primary: { main: '#e3f2fd' },
    secondary: { main: '#f3e5f5' },
    error: { main: '#f44336' },
    warning: { main: '#ffb74d' },
    info: { main: '#4fc3f7' },
    success: { main: '#81c784' },
    type: 'light',
    background: { default: '#fff' },
    text: {
      primary: '#222',
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});
const themeMain = createMuiTheme({
  palette: {
    primary: { main: '#90caf9' },
    secondary: { main: '#ce93d8' },
    error: { main: '#e57373' },
    warning: { main: '#ffa726' },
    info: { main: '#29b6f6' },
    success: { main: '#66bb6a' },
    type: 'light',
    background: { default: '#fff' },
    text: {
      primary: '#222',
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});

export { themeDark, themeLight, themeMain };
