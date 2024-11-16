// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Crear un tema con configuraciones personalizadas
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal (puedes cambiarlo)
    },
    secondary: {
      main: '#dc004e', // Color secundario (puedes cambiarlo)
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Configura tu tipografía
  },
});
