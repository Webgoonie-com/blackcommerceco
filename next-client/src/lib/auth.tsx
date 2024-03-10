import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { User, AuthOptions, NextAuthOptions} from "next-auth";
import { getSession } from 'next-auth/react';
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
//import axiosWithCredentials from '@/Lib/axiosWithCredentials';

//import {orm} from "../../../api-prisma/src/utils/orm.server"
import { orm  } from "@/orm/orm.server";


declare module 'next-auth' {
    interface Session {
        user: {
            email?: string | null | undefined;
            uuid?: string | null | undefined;
            name?: string | null | undefined;
            firstName?: string | null | undefined;
            lastName?: string | null | undefined;
            image: string | null | undefined;
        };
        expires: string;
    }
}
declare module 'next-auth' {
    interface User {
        id: number | undefined;
        uuid: string;
        email: string | string[] | undefined;
        name?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        password: string | undefined;
        hashedPassword: string | null | undefined;
        image: string | null | undefined;
    }
}

export const authOptions: NextAuthOptions = {
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


                console.log('Auth.tsx Payload:',  payload);

                
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
                

                const user = await dbUser.json();
                console.log('Line 112: user auth: lib/auth/ = ', user)

                if (!dbUser.ok) {
                    throw new Error(user.message);
                }

                console.log('Success returning res.ok On Line 119', dbUser.ok)
                console.log('Success returning User On Line 120', user)

                if (
                    user !== null &&
                    user.user !== null
                ) {
                    console.log('Success returning res.ok On Line 126', dbUser.ok)
                    console.log('Success returning User On Line 127', user)
                    // return {
                    //     email: user.user.email,
                    //     uuid: user.user.uuid,
                    //     hashedPassword: user.user.hashedPassword,
                    //     firstName: user.user.firstName, // Add this line
                    //     lastName: user.user.lastName,   // Add this line
                    //     image: user.user.image,
                    // };
                    return user;
                }
        
                // Return null if user data could not be retrieved
                return null;

               


            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account}) {

        //console.log('Line 113 auth.tsx = JWT Callback:', token, user);

        if (account) {
            token.accessToken = account.access_token
            token.id = user.uuid
        }

        if(user) {
            return {
            ...token,
            id: user.id,
            uuid: user.uuid,
            name: user.firstName + ' ' +user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,      
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
        async session({ session, user, token }) {
        
        // console.log('Line 97 sessoin', session)
        // console.log('Line 98 token', token)
        

        if (token && session) {
            session.user = {
                email: token.email as string | null | undefined,
                uuid: token.uuid as string | null | undefined,
                name: token.name as string | null | undefined,
                firstName: token.firstName as string | null | undefined,
                lastName: token.lastName as string | null | undefined,
                image: token.image as string | null | undefined,
            };

      
        }

        return session;
        
        },
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        }
    },
    pages: {
        signIn: '/',
        //signIn: 'api/auth/signin',
        // signIn: '/auth/signin',
        // signOut: '/auth/logout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user'
    
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