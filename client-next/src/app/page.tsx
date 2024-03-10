import { redirect } from "next/navigation";
import { getSession, getAuthSession, login, logout } from "@/lib/libray";

export default async function Page() {
  const session = await getSession();
  
  const authSession = await getAuthSession();
  
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/");
        }}
      >
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Login</button>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>SessioN: {JSON.stringify(session, null, 2)}</pre>

      <pre>authSession: {JSON.stringify(authSession, null, 2)}</pre>
    </section>
  );
}