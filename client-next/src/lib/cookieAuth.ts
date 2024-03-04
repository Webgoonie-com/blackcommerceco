
import axiosWithCredentials from '@/lib/axiosWithCredentials';



export const loginAdmin = async (email: string, hashedPassword: string) => {
 
    try {
        // the route that this express server will catch and handle
        const response =  await axiosWithCredentials.post('/api/adminlogin', {
            email,
            hashedPassword,
        })

        const user = response.data;

        if (!user) {
            return null; // Or handle the case where no user is found
        }

        return user;
        
    } catch (error) {
        console.log(error)
    }

    
  
}

export const loginUser = async (email: string, hashedPassword: string) => {

    
    
    try {
        const response =  await axiosWithCredentials.post('/api/userlogin', {
            email,
            hashedPassword,
        })

        const user = response.data;

        if (!user) {
            return null;
        }

        return user;
        
    } catch (error) {
        console.log(error)
    }

    
  
}


export const getUserProfile = async () => {
    

    try {

        const { data}  =  await axiosWithCredentials.get('/api/userProfile')

        return data
        
    } catch (error) {
        console.log('Error from getUserProfile')
    }

}

export const getAdminProfile = async () => {
    

    try {

        const { data}  =  await axiosWithCredentials.get('/api/adminProfile')

        return data
        
    } catch (error) {
        console.log('Error from GetAdminProfile')
    }

}


