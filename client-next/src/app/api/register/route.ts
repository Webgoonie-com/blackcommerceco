import axiosWithCredentials from '../../../lib/axiosWithCredentials';
import { NextResponse } from 'next/server';

console.log('Hit api Register');

export async function POST(request: Request) {
  const body = await request.json();
//   console.log('Body:', body);

//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     password,
//     hashedPassword,
//   } = body;

  try {
    // Pass data to your REST API here
    const user = await axiosWithCredentials.post(process.env.NEXT_PUBLIC_API_URL + '/api/users/createUser/', body);

    // You can handle the response or any further actions here if needed
    // For example, you can redirect the user if registration is successful
    if (user) {
      // router.push('/success'); // Replace '/success' with your desired success page URL
      console.log('Line 27 Success');
      console.log(user.data);
    }else{
        console.log('Line 30 Failed');
    }

    // Return a response with the user data
    return new NextResponse(JSON.stringify(user), {
      status: user.status,
      statusText: user.statusText,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.error(error);

    // Return an error response
    return new NextResponse(JSON.stringify({ error: 'Registration failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
