
import Image from "next/image";

//import { getSession, getAuthSession, login, logout } from "@/lib/libray";
import Hero from "@/Views/Home/Hero";
import Footer from "@/Views/Footer";
import Categories from "@/Components/Categories";
import Listings from '@/Components/Listings'
export default async function Home() {

  // const session = await getSession();

  // const authSession = await getAuthSession();

  return (
   <div>
      <main 
          className="
                flex
                min-h-screen
                flex-col
                "
          >
        <div>
  
  
          <Hero />
  
          <Listings />

          <Categories />
          
        
  
        </div>
      </main>
   </div>
  );
}
