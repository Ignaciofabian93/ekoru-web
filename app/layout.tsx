import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import { ToastContainer } from "react-toastify";
import AppWrapper from "./wrapper";
import "./globals.css";

const cabin = Cabin({
  variable: "--font-cabin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EKORU",
  description: "Venta sustentable",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      {/* <head>
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}
      <body className={`${cabin.variable} antialiased`}>
        <ToastContainer
          theme="light"
          autoClose={2500}
          pauseOnHover
          position="top-center"
          closeOnClick
        />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
