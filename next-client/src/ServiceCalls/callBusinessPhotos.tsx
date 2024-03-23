
import axios from 'axios'

export const deleteAutoSaveBusinessPhoto = async (data: any, autoSaveToken: any, userId: any) => {
    
    const propertyPhotoData = await data

    try {
        
         const postPhotoData = {
            propertyPhotoData,
            userId,
            autoSaveToken

         }

        const {data: propertyphotoResult} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/deleteAutoSaveBusinessPhoto/:`+autoSaveToken, postPhotoData)
        
        return propertyphotoResult

    } catch (error) {
        console.log('error', error)
        return error
    }

}
