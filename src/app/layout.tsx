// src/app/layout.tsx

'use client'; 

import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../redux/features/theme'; 
import { CssBaseline } from '@mui/material';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
     
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My App</title>
          
        </head>
        <body>
          
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </>
  );
}