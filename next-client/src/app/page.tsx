
import Image from "next/image";

import { getSession, getAuthSession, login, logout } from "@/lib/libray";
import Hero from "@/Views/Home/Hero";
import Categories from "@/Components/Categories";

export default async function Home() {

  const session = await getSession();

  const authSession = await getAuthSession();

  return (
    <main 
        className="
              flex
              min-h-screen
              flex-col
              "
        >
      <div>

        <Hero />

        <Categories />
        
        {/* <pre>SessioN: {JSON.stringify(session, null, 2)}</pre> */}

         {/* <pre>authSession: {JSON.stringify(authSession, null, 2)}</pre> */}


      </div>
    </main>
  );
}
