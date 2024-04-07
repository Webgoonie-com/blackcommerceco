import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import getCurrentUser from "@/Actions/getCurrentUser";
import prisma from "@/lib/orm";
import { userUpdateInputWithFavoriteBapUuids } from "@/Types";

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

    let favoriteBapUuids = currentUser.favoriteBapUuids || ''; // Initialize to empty string if null

    if (favoriteBapUuids && favoriteBapUuids !== '') {
        // If favoriteBapUuids is not empty, append the separator before adding the new property UUID
        favoriteBapUuids += ',';
    }

    // Append the new property UUID and the comma
    
    //favoriteBapUuids += exisitingProperty?.id + ',';

    favoriteBapUuids += propertyUUId + ',';

    const user = await prisma.user.update({
        where: {
            id: currentUser?.id as any,
        },
        data: {
            favoriteBapUuids: favoriteBapUuids.toString(),
        },
    }) as userUpdateInputWithFavoriteBapUuids;

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

    let favoriteBapUuids = [...(currentUser.favoriteBapUuids || '')]

    favoriteBapUuids = favoriteBapUuids.filter((id) => id !== exisitingProperty?.favoriteId?.toString())

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