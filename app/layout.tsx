import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROAM WITH _",
  description: "Plan your next Roam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginModal />
        <RegisterModal />
        {children}
      </body>
    </html>
  );
}
