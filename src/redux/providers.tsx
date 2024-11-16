// src/app/provides.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Asegúrate de que la ruta sea correcta
import { ThemeProvider } from '@mui/material/styles'; // Importar ThemeProvider
import { theme } from '../redux/features/theme'; // Importa tu archivo de tema
import { CssBaseline } from '@mui/material'; // Importar CssBaseline para reiniciar el CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    );
  }