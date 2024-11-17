// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Crear un tema con configuraciones personalizadas
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal 
    },
    secondary: {
      main: '#dc004e', // Color secundario 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', 
  },
});
