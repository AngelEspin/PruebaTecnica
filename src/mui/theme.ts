import { createTheme } from '@mui/material/styles';

// Configuración del tema de Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#003eff', // Color primario
    },
    secondary: {
      main: '#000000', // Color secundario
    },
    background: {
      default: '#e6f4ff', // Fondo por defecto
      paper: '#ffffff', // Fondo blanco para los papeles
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Fuente global
    h3: {
      fontSize: '2.5rem', // Tamaño de la fuente para h3
      fontWeight: 700,
      color: '#333', // Color oscuro para el título
    },
    body1: {
      fontSize: '1rem', // Tamaño de la fuente por defecto
      color: '#555', // Color del texto
      lineHeight: 1.6, // Mejora la legibilidad del texto
    },
  },
  spacing: 8, // Espaciado global
  shape: {
    borderRadius: 12, // Bordes más redondeados
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Botones con bordes redondeados
          padding: '12px 24px', // Botones más grandes
          transition: 'background-color 0.3s ease', // Transición suave al pasar el ratón
          '&:hover': {
            backgroundColor: '#1565c0', // Color al pasar el ratón
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16, // Margen inferior para los campos de texto
          '& .MuiInputBase-root': {
            borderRadius: 12, // Bordes redondeados para los campos de texto
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra más suave
          borderRadius: 12, // Bordes redondeados
          marginBottom: 20, // Espacio inferior entre las tarjetas
          padding: 20, // Espaciado interno
          transition: 'box-shadow 0.3s ease', // Transición suave de sombra
          '&:hover': {
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)', // Efecto de sombra al pasar el ratón
          },
        },
      },
    },
  },
});

export default theme;