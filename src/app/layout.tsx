// src/app/layout.tsx

'use client'; // Make sure this directive is present for the component to be treated as a client component.

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Adjust path based on your project structure
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Defining the root HTML structure */}
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My App</title>
          {/* You can add other meta tags and links here */}
        </head>
        <body>
          {/* Wrapping the entire app with the Redux Provider */}
          <Provider store={store}>
            {children}
          </Provider>
        </body>
      </html>
    </>
  );
}