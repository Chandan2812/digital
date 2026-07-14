import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ContactPopupProvider } from "./components/ContactPopup";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bigwig Media | Digital Marketing Agency",
  description:
    "An animated digital marketing homepage for Bigwig Media, built for attention, conversion and brand momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ContactPopupProvider>{children}</ContactPopupProvider>
      </body>
    </html>
  );
}
