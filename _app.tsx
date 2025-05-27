// pages/_app.tsx
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';  // Import the type

export default function App({ Component, pageProps }: AppProps) { // Use AppProps here
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(31 41 55)', // Tailwind gray-800
            color: 'white',
            fontWeight: '600',
            padding: '12px 20px',
            borderRadius: '0.5rem',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          },
          success: { style: { background: 'rgba(16 185 129)' } }, // green-500
          error: { style: { background: 'rgba(239 68 68)' } }, // red-500
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
