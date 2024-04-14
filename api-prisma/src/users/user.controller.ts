import { UserPhoto } from "@prisma/client";
import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import path from "path";

import { unlink } from "fs/promises";

type User = {
    id: number;
    uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    favoriteBapUuids: any | null;
    favoriteBbUuids: any | null;
    createdAt: Date;
}

type CreateUserInput = Omit<User, "id"> & {
    phone: string,
    hashedPassword: string;
    favoriteBapUuids: any | null;
    favoriteBbUuids: any | null;
};


type FindUserResult = {
    id: number;
    uuid: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    favoriteBapUuids: any | null;
    favoriteBbUuids: any | null;
    hashedPassword: string | null;
    createdAt: Date;
};


export const listUsers = async (): Promise<User[]> => {
    return orm.user.findMany({
        
        
        select:{
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            createdAt: true,
            favoriteBapUuids: true,
            favoriteBbUuids: true,
        }
    })
}

export const getUserEmail = async (email: string): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            phone: true,
            hashedPassword: true,
            email: true,
            favoriteBapUuids: true,
            favoriteBbUuids: true,
            createdAt: true,
        },
    })
}

export const getUserId = async (id: number): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            favoriteBapUuids: true,
            favoriteBbUuids: true,
            email: true,
            createdAt: true,
        },
    })
}

export const getUserUuId = async (uuid: string): Promise<User | null> => {
    return orm.user.findUnique({
        where: {
            uuid,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            favoriteBapUuids: true,
            favoriteBbUuids: true,
            email: true,
            createdAt: true,
        },
    })
}


export const createUser = async (user: CreateUserInput): Promise<User | any> => {
   
    const { firstName, lastName, email, hashedPassword } = user;

    //  console.log('on user.service user', user)

    const hashed = await bcrypt.hash(hashedPassword, 12);



    
    return orm.user.create({
        data: {
            name: user?.firstName + ' ' + user?.lastName,
            firstName,
            lastName,
            email,
            phone: user?.phone,
            hashedPassword: hashed,
        },
        select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            hashedPassword: true,
        }
    });
}



export const loginUser = async (user: CreateUserInput): Promise<User | null> => {
    const { email, hashedPassword } = user;


    // console.log('loginUser', user)
    // console.log('user.hashedPassword', user.hashedPassword)

    // Find the user by email, including the hashedPassword
    const findUser = await orm.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            uuid: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            role: true,
            favoriteBapUuids: true,
            favoriteBbUuids: true,
            hashedPassword: true,
            image: true,
            updatedAt: true,
            createdAt: true,
        },
    }) as FindUserResult;

    //  console.log('findUser', findUser)
    

    if (!findUser) {
        return null; // User not found
    }

    // Compare the entered password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(user.hashedPassword, findUser.hashedPassword || '');

    //  console.log('passwordMatch', passwordMatch)

    if (passwordMatch) {
        // Return the user without the hashedPassword
        const { hashedPassword, ...userWithoutPassword } = findUser;
        return userWithoutPassword;
    } else {
        return null; // Passwords do not match
    }
};

export const updateteUserPrimaryPhoto = async (userPhotoData: any): Promise<User[] | any> => {


    
    
    try {
        
        const primaryPhoto = await orm.user.update({
            where: { id: parseInt(userPhotoData?.userId) },
            data: {
                image: userPhotoData?.imageUrl[0], // Save the concatenated string           
            }
        })
    
       
    
        return primaryPhoto

    } catch (error) {

        console.log('Failed on updateteUserPrimaryPhoto error', error)

    }
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
            favoriteBapUuids: true,
            favoriteBbUuids: true,
            createdAt: true,
            updatedAt: true,
        }
    })
}

export const createUserProfilePhoto = async (user: any): Promise<UserPhoto | any> => {

    
    const files = user.files; // Access the uploaded files
    const body = user.body; // Access the body data

    // console.log('line 252 files:', files)
    // console.log('line 253 body:', body)

    //  const destinationWithoutPublic = files?.destination.replace(/^public\//, '');

    const destinationWithoutPublic = files[0]?.destination.replace('public/', '');
    const imgUrl = body?.imgUrl + '/' + destinationWithoutPublic + '/' + files[0]?.filename;

    const fullLocalPath = path.join(process.cwd(), files[0]?.path)

    if(!body?.userId){

            throw new Error("User not found or is missing");
            
    }

    try {

        const checkIfMainProfilePhotoExisit = await orm.user.findUnique({
            where: {
                
                id: parseInt(body?.userId),
            }
        });


        
        const userPhotoCreation = await orm.userPhoto.create({
            data: {
                token: body?.token,
                serverCaption: "Profile Photo",
                userCaption: "Profile Photo Caption",
                imageSize: files[0]?.size,
                type: files[0]?.mimetype,
                local: fullLocalPath,
                url: imgUrl,
                filename: files[0]?.filename,
                message: "",
                userId: parseInt(body?.userId),
                
            },
            
        });


        if(!checkIfMainProfilePhotoExisit?.image){
            
            await orm.user.update({
                where: { id: parseInt(body?.userId), },
                data: {
                    image: userPhotoCreation.url, // Save the concatenated string           
                }
            })

        }

        return userPhotoCreation



    } catch (error) {
          console.log('Line 298 Error on Error', error)  
    }



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


export const deleteAutoSaveProfilePhoto  = async (userPhotoData: any):  Promise<void> => {
    
    


    const propertyPhotoData = userPhotoData.propertyPhotoData
    const userId = userPhotoData.userId
    const autoSaveToken = userPhotoData.autoSaveToken


    try {
        

        
        const checkIfMainBusinessPhoto = await orm.business.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                userId: parseInt(userId as any)
            }
        });

        

        if(checkIfMainBusinessPhoto){
            
            try {
                
                const primaryPhoto = await orm.business.update({
                    where: { id: checkIfMainBusinessPhoto?.id },
                    data: {
                        imageSrc: '', 
                    }
                })
                
            } catch (error) {
                console.log('Business primaryPhoto error', error)
            }
        }
        

       // return checkIfMainBusinessPhoto


        const deleteThisPhotoObject = await orm.businessphoto.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                token: autoSaveToken,
                userId: parseInt(userId),
            }
        });

        
       
        if(deleteThisPhotoObject){
            

        
            
            const fullLocalPath = path.join(process.cwd(), deleteThisPhotoObject.imgFilePath)
    
            
    
            await unlink(deleteThisPhotoObject.imgFilePath)

            


            await orm.businessphoto.delete({
                where: {
                  id: deleteThisPhotoObject.id,
                },
              })


              //return deleteBusinessPhoto

              
        }



        
    } catch (error) {
        console.log('Error deleting', error)
    }

    return userPhotoData;
}

export const deleteProfilePhoto  = async (userPhotoData: any):  Promise<void> => {
    
    


    const imageUrl = userPhotoData.imageUrl
    const userId = userPhotoData.userId
    const autoSaveToken = userPhotoData.autoSaveToken

    // console.log('userPhotoData.propertyPhotoData.imageUrl', userPhotoData.imageUrl)
    // console.log('imageUrl', imageUrl)


    try {
        

        
        const checkIfUserProfilePhotoExisit = await orm.user.findFirst({
            where: {
                //image: imageUrl,
                id: parseInt(userId as any)
            }
        });

        // console.log('checkIfUserProfilePhotoExisit',)

        
        // console.log('Before the Check  checkIfUserProfilePhotoExisit?.image: ',  checkIfUserProfilePhotoExisit?.image)
        // console.log('Before the Check  propertyPhotoData: ', imageUrl)

        if(checkIfUserProfilePhotoExisit && checkIfUserProfilePhotoExisit?.image === imageUrl){
            
            //  console.log("Yes it matched existing profile Photo URL")

            try {
                
                await orm.user.update({
                    where: { id: checkIfUserProfilePhotoExisit?.id },
                    data: {
                        image: '', 
                    }
                })
                
            } catch (error) {
                console.log('User primaryPhoto error', error)
            }
        }else{
            console.log("Didnt match existing  profile Photo URL")
        }
        

        
        if(!checkIfUserProfilePhotoExisit){
            throw new Error("Can't Delete A User Photo We Have No Record Of...");
            
        }
        
       //    console.log('Liie 472 checkIfUserProfilePhotoExisit:, ', checkIfUserProfilePhotoExisit)

       

        const deleteThisPhotoObject = await orm.userPhoto.findFirst({
            where: {
                url: imageUrl,
                token: autoSaveToken,
                userId: parseInt(userId),
            }
        });

        
       
        if(deleteThisPhotoObject){
            

        
            
            //const fullLocalPath = path.join(process.cwd(), deleteThisPhotoObject.local)
            
            if(deleteThisPhotoObject.local){
                
                await unlink( deleteThisPhotoObject.local)
    
                
                // console.log('Deleting User PHoto')
    
                await orm.userPhoto.delete({
                    where: {
                      id: deleteThisPhotoObject.id,
                    },
                  })
            }
            
    


              //return deleteBusinessPhoto

              
        }



        
    } catch (error) {
        console.log('Error deleting', error)
    }

    return userPhotoData;
}