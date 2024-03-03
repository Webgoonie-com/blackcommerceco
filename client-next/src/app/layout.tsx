import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarPublic from "@/Components/navbar/NavbarPublic";
import ClientOnly from "@/Components/ClientOnly";
import Modal from "@/Components/modals/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlackCommerce.co",
  description: "A market place geared towards minority development and minority communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>

        
          <main className="root">
            <Modal title="Login Modal Here" isOpen />
            <NavbarPublic />
            {children}
          </main>

        </ClientOnly>
      </body>
    </html>
  );
}
