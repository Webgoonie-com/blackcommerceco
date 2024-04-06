import { NextResponse } from "next/server";

import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";

interface IParams {
    businessUUId?: string;
    favoriteIds?: string[];
}


interface IUserUpdateData {
    favoriteIds: string[]; // Define favoriteIds property here
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

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(businessUUId)

    const user = await prisma.user.update({
        where:{
            id: currentUser?.id as any,
        },
        data: { 
            favoriteIds
        } as IUserUpdateData
    });

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

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => id !== businessUUId)

    const user = await prisma.user.update({
        where:{
            id: currentUser?.id as any,
        },
        data: { 
            favoriteIds
        } as IUserUpdateData
    });

    return NextResponse.json(user);
}