import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export { authOptions } from "@/lib/auth";

const secretKey = process.env.NEXTAUTH_SECRET || "secret";

//console.log('secretKey', secretKey)

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    //.setExpirationTime("10s")
    //.setExpirationTime("20d") // it will be expired after 20 days
    //.setExpirationTime(120") // it will be expired after 120ms
    //.setExpirationTime("120s") // it will be expired after 120s
    
    .setExpirationTime("2m")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  
  try {

    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    return payload;
    
  } catch (error) {

    console.error("JWT Verification Error:", error);

    throw error;

  }

}

export async function authDecrypt(input: string): Promise<any> {
  
  try {

    console.log('input: ', { input })

    //const session = await getSession();
    // const { payload } = await jwtVerify(input, key, {
    //   algorithms: ["A256GCM"],
    //   algorithms: ["dir"],
    // });

    // return payload;

    return input
    
  } catch (error) {

    console.error("JWT Verification Error:", error);

    throw error;

  }

}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  // This is where you would talk to a database.
  //const user = { email: formData.get("email"), name: "John" };

  const data = { email: formData.get("email"),  password: formData.get("hasedPassword") };
  
  const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/register/`, data)

  // Assuming your API response contains user data
  const user = response.data;

  // Create the session after getting user
  const expires = new Date(Date.now() + 60 * 1000);   // This is gonnaehe expiration.
  
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("userSession", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getAuthSession() {
  //const session = cookies().get("next-auth.session-token")?.value;
  const session = cookies().get("next-auth.csrf-token")?.value;
  
  console.log('session', session);

  if (!session) return null;
  return await authDecrypt(session);
}



export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}