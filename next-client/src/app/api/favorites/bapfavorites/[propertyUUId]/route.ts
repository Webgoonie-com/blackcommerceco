import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";
import { userUpdateBapInput, } from "@/Types";

interface IParams {
    propertyUUId?: string;
    
}


export async function POST(
    request: Request,
    { params }: { params: IParams }
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { propertyUUId } = params;

    if (!propertyUUId || typeof propertyUUId !== "string") {
        throw new Error("Invalid propertyUUId ");
    }

  
    // Initialize to empty string if null
    let favoriteBapUuids = currentUser.favoriteBapUuids || '';

    if (favoriteBapUuids && favoriteBapUuids !== '') {
        // If favoriteBapUuids is not empty, append the separator before adding the new property UUID
        if (!favoriteBapUuids.endsWith(',')) {
            favoriteBapUuids += ',';
        }
    }

    // Append the new property UUID and the comma
    favoriteBapUuids += propertyUUId;

    const user = await prisma.user.update({
        where: {
            id: currentUser?.id as any,
        },
        data: {
            favoriteBapUuids: favoriteBapUuids.toString(),
        },
    }) as userUpdateBapInput;

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

    let exisitingProperty = await prisma.property.findFirst({
        where:{
            uuid: propertyUUId,
        },
        
    })

    if(!exisitingProperty || !exisitingProperty?.uuid) {
        throw new Error("Invalid exisitingProperty uuid ");
        
    }

    let favoriteBapUuids = (currentUser.favoriteBapUuids || '').split(',').filter(Boolean); // Split string into array and remove empty strings

    // Ensure existingProperty.favoriteId is a UUID before adding it to the filter
    if (exisitingProperty?.uuid) {
        favoriteBapUuids = favoriteBapUuids.filter(id => id !== exisitingProperty.uuid.toString());
    }

    const user = await prisma.user.update({
        where:{
            id: currentUser?.id as any,
        },
        data: {
            favoriteBapUuids: favoriteBapUuids.toString(),
        },
        
    });

    return NextResponse.json(user);
}