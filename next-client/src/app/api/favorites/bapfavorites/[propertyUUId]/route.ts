import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";

interface IParams {
    propertyUUId?: string;
    
}


export async function POST(
    request: Request,
    { params }: { params: IParams }
) {

    console.log('Hit POST favorite')

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { propertyUUId } = params;

    if (!propertyUUId || typeof propertyUUId !== "string") {
        throw new Error("Invalid propertyUUId ");
    }

    const exisitingProperty = await prisma.property.findFirst({
        where:{
            uuid: propertyUUId,
        },
        
    });

    let favoritesIds = currentUser.favoriteUuids || ''; // Initialize to empty string if null

    if (favoritesIds && favoritesIds !== '') {
        // If favoritesIds is not empty, append the separator before adding the new property UUID
        favoritesIds += ',';
    }

    // Append the new property UUID and the comma
    
    //favoritesIds += exisitingProperty?.id + ',';

    favoritesIds += propertyUUId + ',';

    const user = await prisma.user.update({
        where: {
            id: currentUser?.id as any,
        },
        data: {
            favoriteUuids: favoritesIds,
        },
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

    const { propertyUUId } = params;

    if(!propertyUUId || typeof propertyUUId !== "string") {
        throw new Error("Invalid propertyUUId ");
        
    }

    const exisitingProperty = await prisma.property.findFirst({
        where:{
            uuid: propertyUUId,
        },
        
    })

    if(!exisitingProperty || !exisitingProperty?.listingId) {
        throw new Error("Invalid exisitingProperty listingId ");
        
    }

    let favoriteUuids = [...(currentUser.favoriteUuids || '')]

    favoriteUuids = favoriteUuids.filter((id) => id !== exisitingProperty?.favoriteId?.toString())

    const user = await prisma.user.update({
        where:{
            id: currentUser?.id as any,
        },
        data: {
            favoriteUuids: favoriteUuids.toString(),
        },
        
    });

    return NextResponse.json(user);
}