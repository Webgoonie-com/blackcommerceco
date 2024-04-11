import type { Metadata } from "next";

import "./globals.css";

import NavbarPublic from "@/Components/navbar/NavbarPublic";
import ClientOnly from "@/Components/ClientOnly";
import RegisterModal from "@/Components/modals/auth/RegisterModal";
import LoginModal from "@/Components/modals/auth/LoginModal";
import ToasterProvider from "@/Providers/ToasterProvider";
import getCurrentUser from "@/Actions/getCurrentUser";
import AuthProvider from "@/Providers/AuthProvider";
import QueryProvider from '@/Providers/QueryProvider'



export const metadata: Metadata = {
  title: "BlackCommerce Official",
  description: "A app made for a miniority group of people on planet earth deprived far for too long.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
     <QueryProvider>
        <body>
          <div id="page-container">
            <AuthProvider>
              <ClientOnly>
                    <ToasterProvider />
                    <RegisterModal />
                    <LoginModal />
                    
                    {children}
      
              </ClientOnly>
            </AuthProvider>
          </div>
        </body>
    </QueryProvider>
    </html>
  );
}
