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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* <head>
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}
      <body className={`${cabin.variable} antialiased`}>
        <ToastContainer theme="light" autoClose={2500} pauseOnHover position="top-center" closeOnClick />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
