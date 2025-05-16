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
  title: "Ekoru",
  description: "Venta sustentable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cabin.variable} antialiased`}>
        <ToastContainer theme="light" autoClose={4000} pauseOnHover position="top-center" closeOnClick />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
