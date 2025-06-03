"use client";
import "./globals.css";
import Navbar from '../components/Navbar';
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-concert-one), "Concert One", sans-serif',
  },
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <div style={{ paddingTop: '64px' }}>
              <ToastContainer />
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
