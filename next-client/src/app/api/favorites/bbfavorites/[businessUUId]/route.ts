import { NextResponse } from "next/server";

import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";

interface IParams {
    businessUUId?: string;
    favoriteBbUuids?: string[];
}


interface IUserUpdateData {
    favoriteBbUuids: string[]; // Define favoriteBbUuids property here
    businessUUId: string;
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

    let favoriteBbUuids = [...(currentUser.favoriteBbUuids || [])]

    favoriteBbUuids.push(businessUUId)

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