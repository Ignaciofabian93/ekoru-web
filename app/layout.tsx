import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { colors } from "@/constants/colors";
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
    <html lang="en">
      <head>
        <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body className={`${cabin.variable} antialiased`}>
        <ToastContainer
          theme="colored"
          autoClose={4000}
          toastStyle={{ backgroundColor: colors.primary, color: "#f7f7f7" }}
          pauseOnHover
          position="top-center"
          closeOnClick
        />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
