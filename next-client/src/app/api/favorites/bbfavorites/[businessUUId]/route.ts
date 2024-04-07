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

    console.log('HIT POST ON bbfavorites')

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { businessUUId } = params;

    console.log('HIT POST ON businessUUId: ', businessUUId)

    if(!businessUUId || typeof businessUUId !== "string") {
        throw new Error("Invalid businessUUId ");
        
    }

    const exisitingBusiness = await prisma.property.findFirst({
        where:{
            uuid: businessUUId,
        },
        
    });

    //  let favoriteBbUuids = [...(currentUser.favoriteBbUuids || '')]

    let favoriteBbUuids = currentUser.favoriteBbUuids || '';

    //  favoriteBbUuids.push(businessUUId)

    if (favoriteBbUuids && favoriteBbUuids !== '') {
        // If favoriteBbUuids is not empty, append the separator before adding the new property UUID
        favoriteBbUuids += ',';
    }

    // Append the new property UUID and the comma
    
    //favoriteBbUuids += exisitingProperty?.id + ',';

    //favoriteBbUuids += businessUUId + ',';
    favoriteBbUuids += businessUUId;



    // const user = await prisma.user.update({
    //     where:{
    //         id: currentUser?.id as any,
    //     },
    //     data: { 
    //         favoriteBbUuids
    //     }
    // });

    //  return NextResponse.json(favoriteBbUuids);

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

    let favoriteBbUuids = [...(currentUser.favoriteBbUuids || [])]

    favoriteBbUuids = favoriteBbUuids.filter((id) => id !== businessUUId)

    // const user = await prisma.user.update({
    //     where:{
    //         id: currentUser?.id as any,
    //     },
    //     data: { 
    //         favoriteBbUuids
    //     } 
    // });

    return NextResponse.json(favoriteBbUuids);
}