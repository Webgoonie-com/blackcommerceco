
import "../globals.css";
import type { Metadata } from "next";
import NavbarPublic from "@/Components/navbar/NavbarPublic";
import ClientOnly from "@/Components/ClientOnly";
import RegisterModal from "@/Components/modals/auth/RegisterModal";
import LoginModal from "@/Components/modals/auth/LoginModal";
import ToasterProvider from "@/Providers/ToasterProvider";
import getCurrentUser from "@/Actions/getCurrentUser";
import Footer from "@/Views/Footer";
import RentMyPropertyModal from "@/Components/modals/properties/RentMyPropertyModal";
import BusinessStoreResgistrationModal from "@/Components/modals/businesses/BusinessResgistrationModal";
import SearchModal from "@/Components/modals/search/SearchModal";
import SearchPropertyModal from "@/Components/modals/search/SearchPropertyModal";
import SearchBusinessModal from "@/Components/modals/search/SearchBusinessModal";
import ProfileModal from "@/Components/modals/profile/ProfileModal";



export const metadata: Metadata = {
  title: "BlackCommerce.co",
  description: "A app made for a miniority group of people on planet earth deprived far for too long.",
};

export default async function RootLayout({  children } : Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    
     
          <main id="page-container" className="h-full">

            <ClientOnly>
                  <ToasterProvider />
                  <RegisterModal />
                  <LoginModal />
                  <SearchModal />
                  <SearchPropertyModal />
                  <SearchBusinessModal />
                  <ProfileModal  currentUser={currentUser as any} />
                  <BusinessStoreResgistrationModal currentUser={currentUser as any} />
							    <RentMyPropertyModal currentUser={currentUser as any} />
                  
                  <NavbarPublic currentUser={currentUser as any} />
    
                  {children}
                
                <Footer />

            </ClientOnly>
    
    
          </main>
    
   
  );
}
