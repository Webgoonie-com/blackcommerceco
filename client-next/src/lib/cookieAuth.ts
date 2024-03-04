
import axiosWithCredentials from '@/lib/axiosWithCredentials';



export const loginAdmin = async (email: string, hashedPassword: string) => {
 
    try {
        // the route that this express server will catch and handle
        const response =  await axiosWithCredentials.post('/api/adminlogin', {
            email,
            hashedPassword,
        })

        const user = response.data;

        console.log('admin data received', user)

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

        console.log('user data received', user)

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

        console.log('user profile received', data)

        return data
        
    } catch (error) {
        console.log('Error from getUserProfile')
    }

}

export const getAdminProfile = async () => {
    

    try {

        const { data}  =  await axiosWithCredentials.get('/api/adminProfile')

        console.log('returned Data from GetAdminProfile', data)

        return data
        
    } catch (error) {
        console.log('Error from GetAdminProfile')
    }

}


