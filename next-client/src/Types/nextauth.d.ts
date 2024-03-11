import { CurrentUser } from '@/types/nextauth';
import { categories } from "./../components/navbar/Categories/CategoriesProperties";
import { DefaultSession, DefaultUser } from "next-auth";

// Define a role enum
export enum Role {
  user = "Standard",
  admin = "Admin",
}

// common interface for JWT and Session
interface IUser extends DefaultUser {
  Id?: number | undefined | null; 
  role?: string | undefined | null; 
  uuid?: string | undefined | null;
  token?: string | undefined | null; 
  acctStatus: number | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
  usrImage: string | undefined | null;
  name?: string | undefined | null;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  favoriteIds: string | undefined | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | undefined | null;

  
}

interface CurrentUser extends IUser {}

interface Categories {
  categories?: { label: string; icon: string; description: string } | null;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Admin extends IUser {}
  interface Session {
    user?: User;
    admin?: Admin;
    emailVerified?: Date | undefined | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

export {IUser, CurrentUser }