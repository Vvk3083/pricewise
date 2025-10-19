import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const inter = Inter({
  subsets:['latin'],
  variable: "--font-inter",
})
const space_Grotesk = Space_Grotesk(
  {subsets:['latin'],
    variable: "--font-spaceGrotesk",
    weight:['300','400','500','600','700']
  },
  
)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pricewise",
  description: "Track the prices of product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${space_Grotesk.variable} antialiased`}>
        <main>
          <Navbar></Navbar>
          {children}
        </main>
      </body>
    </html>
  );
}
