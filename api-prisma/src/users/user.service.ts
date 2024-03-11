import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";

type User = {
    id: number;
    uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: Date;
}

type CreateUserInput = Omit<User, "id"> & {
    hashedPassword: string;
};


type FindUserResult = {
    id: number;
    uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    hashedPassword: string | null;
    createdAt: Date;
};


export const listUsers = async (): Promise<User[]> => {
    return orm.user.findMany({
        select:{
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        }
    })
}

export const getUserEmail = async (email: string): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            hashedPassword: true,
            email: true,
            createdAt: true,
        },
    })
}

export const getUserId = async (id: number): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        },
    })
}

export const getUserUuId = async (uuid: string): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            uuid,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        },
    })
}


export const createUser = async (user: CreateUserInput): Promise<User | any> => {
   
    const { firstName, lastName, email, hashedPassword } = user;

    console.log('on user.service user', user)

    const hashed = await bcrypt.hash(hashedPassword, 12);



    
    return orm.user.create({
        data: {
            firstName,
            lastName,
            email,
            hashedPassword: hashed,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            hashedPassword: true,
        }
    });
}

export const loginUser = async (user: CreateUserInput): Promise<User | null> => {
    const { email, hashedPassword } = user;


    console.log('loginUser', user)
    console.log('user.hashedPassword', user.hashedPassword)

    // Find the user by email, including the hashedPassword
    const findUser = await orm.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            hashedPassword: true,
            image: true,
            updatedAt: true,
            createdAt: true,
            favoriteIds: true,
        },
    }) as FindUserResult;

    console.log('findUser', findUser)
    

    if (!findUser) {
        return null; // User not found
    }

    // Compare the entered password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(user.hashedPassword, findUser.hashedPassword || '');

    console.log('passwordMatch', passwordMatch)

    if (passwordMatch) {
        // Return the user without the hashedPassword
        const { hashedPassword, ...userWithoutPassword } = findUser;
        return userWithoutPassword;
    } else {
        return null; // Passwords do not match
    }
};


export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    const {firstName, lastName, email} = user

    return orm.user.update({ 
        where: { id: id},
        data: {
            firstName,
            lastName,
            email,
        },
        select:{
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    })
}


export const deleteUserId = async (id: number): Promise<void> => {
    await orm.user.delete({
        where: { id: id},
    })
}

export const deleteUserUuid = async (uuid: string): Promise<void> => {
    await orm.user.delete({
        where: { uuid: uuid},
    })
}