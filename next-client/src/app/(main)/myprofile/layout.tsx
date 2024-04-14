import type { Metadata } from "next";

import getCurrentUser from "@/Actions/getCurrentUser";
import MyProfileClient from "./MyProfileClient";



export const metadata: Metadata = {
  title: "BlackCommerce Profile",
  description: "Community Member Profile",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <div className="MyProfile">
        <div className="blur" style={{top: '18%', right: '0'}}></div>{/* top right One  */}
        <div className="blur" style={{top: '36%', left: '-7rem'}}></div> {/* Left One  */}
        {children}
    </div>
  );
}
