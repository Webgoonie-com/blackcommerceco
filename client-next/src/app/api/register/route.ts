import axios from 'axios';
import { NextResponse } from "next/server";


console.log('Hit api Register')
export async function POST(
    request: Request, 
) {


    const body = await request.json();
    console.log('Body: ' + body)
    const { 
        firstName,
        lastName,
        email,
        phone,
        password,
        hashedPassword,
    } = body;

    console.log('Body: ', body);

    

    try{
        
        
        // Pass data to your REST API here
        const user = await axios.post(process.env.NEXT_PUBLIC_API_URL +'/api/users/createUser/', body);

        // You can handle the response or any further actions here if needed
        // For example, you can redirect the user if registration is successful
        if (user.status === 200) {
            //router.push('/success'); // Replace '/success' with your desired success page URL
            console.log('Line 35 Success')
            console.log(user.data)
        }

        return new NextResponse(JSON.stringify(user.data), {
            status: user.status,
            statusText: user.statusText,
            });

    } catch (error) {
        // Handle any errors that occur during the registration process
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Registration failed' }), {
        status: 500,
        });
    }
}
