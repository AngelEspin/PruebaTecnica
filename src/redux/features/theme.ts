// theme.ts
import { createTheme } from '@mui/material/styles';

// Configuración del tema de Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF', // Color primario
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
    background: {
      default: '#f4f6f7 ', // Fondo por defecto
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Fuente global
    h3: {
      fontSize: '2.5rem', // Tamaño de la fuente para h3
      fontWeight: 700,
    },
    
  },
  spacing: 8, // Espaciado global
});

export default theme;
