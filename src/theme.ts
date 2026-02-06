'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  
  palette: {
    primary: {
      main: '#1976d2', // اللون الأساسي
    },
    secondary: {
      main: '#9c27b0',
    },
    mode: 'light', 
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',   
        },
      },
    },
  },
});

export default theme;
