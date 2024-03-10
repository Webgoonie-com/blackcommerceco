import Image from "next/image";

import { getSession, getAuthSession, login, logout } from "@/lib/libray";

export default async function Home() {

  const session = await getSession();

  const authSession = await getAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        
        <h2>Home page</h2>

        
        {/* <pre>SessioN: {JSON.stringify(session, null, 2)}</pre> */}

         {/* <pre>authSession: {JSON.stringify(authSession, null, 2)}</pre> */}


      </div>
    </main>
  );
}
