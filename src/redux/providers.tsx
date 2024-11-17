//configuración del entorno de la aplicación en Next.js, integrando Redux y Material-UI
'use client';

import { Provider } from 'react-redux';  // Redux provider
import { store } from '../redux/store';  // Store de Redux
import { ThemeProvider } from '@mui/material/styles';  // Proveedor de tema Material-UI
import theme from '../mui/theme';  // Tema personalizado
import { CssBaseline } from '@mui/material';  // Normaliza estilos

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>  {/* Provee el store */}
      <ThemeProvider theme={theme}>  {/* Aplica el tema */}
        <CssBaseline />  {/* Normaliza estilos */}
        {children}  {/* Componentes hijos */}
      </ThemeProvider>
    </Provider>
  );
}
