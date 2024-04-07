import { orm } from "../utils/orm.server";



type EmailSubcriber = {
    id: number;
    uuid: string| null;
    emailsub: string;
    createdAt: Date;
}


type EmailSubcriberInput = Omit<EmailSubcriber, "id"> & {
    id: number;
    uuid: string;
    emailsub: string;
    createdAt: Date;
};

export const createEmailSubscriber = async (admin: EmailSubcriberInput): Promise<EmailSubcriber | any> => {

    const { emailsub } = admin;

    return orm.emailSubscriber.create({
        data: {
            emailsub,
        },
        select: {
            id: true,
            uuid: true,
            emailsub: true,
            createdAt: true,
        }
    });
}



export const listEmailSubscribers = async (): Promise<EmailSubcriber[]> => {

    return orm.emailSubscriber.findMany({
        select:{
            id: true,
            uuid: true,
            emailsub: true,
            createdAt: true,
        }
    })
}


