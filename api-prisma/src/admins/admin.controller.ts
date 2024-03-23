import { orm } from "../utils/orm.server";


type Admin = {
    id: number;
    uuid: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    createdAt: Date;
}

type CreateAdminInput = Omit<Admin, "id"> & {
    id: number;
    uuid: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    hashedPassword: string;
};


export const createAdmin = async (admin: CreateAdminInput): Promise<Admin | any> => {

    const { firstName, lastName, email, hashedPassword } = admin;

    return orm.admin.create({
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

export const listAdmins = async (): Promise<Admin[]> => {

    return orm.admin.findMany({
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


export const checkAdminByEmail = async (email: string): Promise<Admin | null> => {
    return orm.admin.findUnique({
        where: {
            email,
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

export const getAdminId = async (id: number): Promise<Admin | null> => {
    return orm.admin.findUnique({
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

export const getAdminUuId = async (uuid: string): Promise<Admin | null> => {
    return orm.admin.findUnique({
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

export const getAdminEmail = async (email: string): Promise<Admin | null> => {
    return orm.admin.findUnique({
        where: {
            email,
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


export const loginAdmin = async (admin: CreateAdminInput): Promise<Admin | any> => {

    const { email, hashedPassword } = admin;

    return orm.admin.findFirst({
        where: {
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