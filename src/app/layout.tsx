import type { Metadata } from "next";
import { Gentium_Plus } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import AuthProvider from "@/components/AuthProvider/AuthProvider";



const gentiumPlus = Gentium_Plus({
  weight: "400",
  variable: "--font-gentium-plus",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QT-Challenge",
  description: "QT Frontend Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gentiumPlus.variable}>
        <AuthProvider>
          <Navbar />
          <div style={{ paddingTop: '64px' }}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}