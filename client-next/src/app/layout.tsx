import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarPublic from "@/Components/navbar/NavbarPublic";
import ClientOnly from "@/Components/ClientOnly";
import RegisterModal from "@/Components/modals/auth/RegisterModal";
import LoginModal from "@/Components/modals/auth/LoginModal";
import ToasterProvider from "@/Providers/ToasterProvider";

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
        <main className="root">
          <ClientOnly>
              <ToasterProvider />
              <RegisterModal />
              {/* <LoginModal /> */}
              <NavbarPublic />

              {children}

          </ClientOnly>
        </main>
      </body>
    </html>
  );
}
