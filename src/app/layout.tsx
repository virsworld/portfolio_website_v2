import type { Metadata } from "next";
import { Poppins, Courier_Prime, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const mono = IBM_Plex_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

const courier = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier',
});

export const metadata: Metadata = {
  title: "Vir | Portfolio",
  description: "Showcasing my work and thoughts.",
  icons: {
    icon: "/favicon.ico", // Path to your favicon file in the /app or /public directory
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${courier.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
