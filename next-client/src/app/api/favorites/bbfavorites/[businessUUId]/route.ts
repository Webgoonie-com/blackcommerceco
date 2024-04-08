import { NextResponse } from "next/server";

import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";
import { userUpdateBbInput } from "@/Types";

interface IParams {
    businessUUId?: string;
    favoriteBbUuids?: string | string[];
}


interface IUserUpdateData {
    favoriteBbUuids: string;
    businessUUId: string | string[];
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
){

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { businessUUId } = params;

    if(!businessUUId || typeof businessUUId !== "string") {
        throw new Error("Invalid businessUUId ");
        
    }


    let favoriteBbUuids = currentUser.favoriteBbUuids || '';

    if (favoriteBbUuids && favoriteBbUuids !== '') {

        // If favoriteBbUuids is not empty, append the separator before adding the new property UUID
        if (!favoriteBbUuids.endsWith(',')) {
            favoriteBbUuids += ',';
        }
    }

    // Append the new property UUID and the comma
    favoriteBbUuids += businessUUId; 

    const user = await prisma.user.update({
        where: {
            id: currentUser?.id as any,
        },
        data: {
            favoriteBbUuids: favoriteBbUuids.toString(),
        },
    }) as userUpdateBbInput;

    return NextResponse.json(user);
    
}


export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const { businessUUId } = params;

    if(!businessUUId || typeof businessUUId !== "string") {
        throw new Error("Invalid businessUUId ");
        
    }

    let exisitingBusiness = await prisma.business.findFirst({
        where:{
            uuid: businessUUId,
        },
        
    })

    
    if(!exisitingBusiness || !exisitingBusiness?.uuid) {
        throw new Error("Invalid exisitingBusiness uuid ");
        
    }

    let favoriteBbUuids = (currentUser.favoriteBbUuids || '').split(',').filter(Boolean);

    if (exisitingBusiness?.uuid) {
        favoriteBbUuids = favoriteBbUuids.filter(id => id !== exisitingBusiness.uuid.toString());
    }

    const user = await prisma.user.update({
        where:{
            id: currentUser?.id as any,
        },
        data: { 
            favoriteBbUuids: favoriteBbUuids.toString(),
        } 
    });

    return NextResponse.json(user);
}