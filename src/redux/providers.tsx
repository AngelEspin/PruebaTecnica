// src/app/provides.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { ThemeProvider } from '@mui/material/styles'; 
import theme from '../redux/features/theme'; 
import { CssBaseline } from '@mui/material'; 

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