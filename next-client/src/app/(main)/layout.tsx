
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import NavbarPublic from "@/Components/navbar/NavbarPublic";
import ClientOnly from "@/Components/ClientOnly";
import RegisterModal from "@/Components/modals/auth/RegisterModal";
import LoginModal from "@/Components/modals/auth/LoginModal";
import ToasterProvider from "@/Providers/ToasterProvider";
import getCurrentUser from "@/Actions/getCurrentUser";
import AuthProvider from "@/Providers/AuthProvider";
import QueryProvider from '@/Providers/QueryProvider'
import Footer from "@/Views/Footer";
import RentMyPropertyModal from "@/Components/modals/properties/RentMyPropertyModal";
import BusinessStoreResgistrationModal from "@/Components/modals/businesses/BusinessResgistrationModal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlackCommerce Main",
  description: "A app made for a miniority group of people on planet earth deprived far for too long.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    
     
    
    // <main id="page-container" className="h-full">
    //           <ClientOnly>
      
    //                 {children}
    //             <Footer />
    //           </ClientOnly>
    //        </main>

          <main id="page-container" className="h-full">

            <ClientOnly>
                  <ToasterProvider />
                  <RegisterModal />
                  <LoginModal />
                  <BusinessStoreResgistrationModal currentUser={currentUser as any} />
							    <RentMyPropertyModal currentUser={currentUser as any} />
                  <NavbarPublic currentUser={currentUser as any} />
    
                  {children}
                
                <Footer />

            </ClientOnly>
    
    
          </main>
    
   
  );
}