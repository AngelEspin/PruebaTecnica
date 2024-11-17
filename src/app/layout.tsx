// src/app/layout.tsx

'use client'; 

import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { ReactNode } from 'react';

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
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}