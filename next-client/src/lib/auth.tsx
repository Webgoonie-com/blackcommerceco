import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions  } from "next-auth";
import { getSession } from "next-auth/react";


import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { orm } from "@/lib/orm"

export const authOptions: AuthOptions  = {
    adapter: PrismaAdapter(orm as any),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Your Email", type: "email" },
                hashedPassword: { label: "Your Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials?.email || !credentials?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
                

                const payload = {
                    email: credentials?.email,
                    hashedPassword: credentials?.hashedPassword,
                };
        
                const dbUser = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/loginuser/`,
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                    "Content-Type": "application/json",
                    },
                }
                );
        
                //console.log('Line 42: dbUser auth: lib/auth/ = ', dbUser)
        
                const user = await dbUser.json();
                //console.log('Line 45: user auth: lib/auth/ = ', user)
        
                if (!dbUser.ok) {
                    throw new Error(user.message);
                }
                
                if(user.admin){
                    //console.log('Detected Admin on Line 150', user.admin)
                }
                    // If no error and we have user data, return it
                if (
                    user !== null &&
                    user.user !== null
                ) {
                    //console.log('Success returning res.ok On Line 58', res.ok)
                    //console.log('Success returning User On Line 59', user)
                    return user;
                }
        
                // Return null if user data could not be retrieved
                return null;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        jwt({ token, user, account }) {

        if (account) {
                token.accessToken = account.access_token
                token.uuid = user.uuid
                token.id = user.id
        }

        if(user) {
            return {
            ...token,
            id: user.id,
            uuid: user.uuid,
            role: user.role,
            token: user.token,
            name: user.firstName + ' ' +user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            usrImage: user.usrImage,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            upatedAt: user.updatedAt,
            }
        }

        return token;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
           if (url.startsWith("/")) return `${baseUrl}${url}`
           // Allows callback URLs on the same origin
           else if (new URL(url).origin === baseUrl) return url
           
           return baseUrl
        },
        session: async ({ session, token }) => {
        
            //const userSession = await getSession();

        if(token && session.user) {
            session.user.id = token.id;
            session.user.uuid = token.uuid;
            session.user.role = token.role;
            session.user.token = token.token;
            session.user.name = token.firstName + ' ' + token.lastName;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.email = token.email;
            session.user.emailVerified = token.emailVerified;
            session.user.image = token.usrImage;
            session.user.createdAt = token.createdAt;
            session.user.updatedAt = token.updatedAt;
        }
        return session;
        }
    },
    pages: {
        signIn: '/',
       // signOut: '/auth/logout',
    //     // error: '/auth/error',
    //     // verifyRequest: '/auth/verify-request',
    //     // newUser: '/auth/new-user'
    
    },
    // Enable debug messages in the console if we are having problems
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const getServerSession = async (req: any) => {
    return await getSession({ req }); // Ensure that getSession is imported from 'next-auth/react'
};


export default NextAuth(authOptions);