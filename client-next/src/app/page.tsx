import { redirect } from "next/navigation";


export default async function Page() {

  
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
       
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
         
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>SessioN: </pre>

      <pre>authSession:</pre>
    </section>
  );
}