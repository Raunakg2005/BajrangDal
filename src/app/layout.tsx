import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google"; // Import fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" }); // Add Cinzel

export const metadata: Metadata = {
  title: "Bajrang Dal - Seva, Suraksha, Sanskar",
  description: "Join the dedicated force of Bajrang Dal. Serve Dharma, Protect Society, and Preserve Culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
