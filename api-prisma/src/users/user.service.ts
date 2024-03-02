import {db} from "../utils/db.server"
import { orm } from "../utils/orm.server";


type User = {
    id: number;
    uuid: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: Date;
}

type CreateUserInput = Omit<User, "id"> & {
    hashedPassword: string;
};


export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany({
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

export const getUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
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


export const createUser = async (user: CreateUserInput): Promise<User | any> => {
    const { firstName, lastName, email, hashedPassword } = user;

    return db.user.create({
        data: {
            firstName,
            lastName,
            email,
            hashedPassword,
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