import axiosWithCredentials from '../../../lib/axiosWithCredentials';
import { NextResponse } from 'next/server';

console.log('Hit api Register');

export async function POST(request: Request) {
  
  console.log('Inside POST ');

  const body = await request.json();

  
  try {
    // Pass data to your REST API here
    const response = await axiosWithCredentials.post(process.env.NEXT_PUBLIC_API_URL + '/api/users/createUser/', body);

    // Log only relevant information
    console.log('Line 27 Success');
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    // You can handle the response or any further actions here if needed
    if (response.status === 201) {
      console.log('User Data:', response.data);
    } else {
      console.log('Line 30 Failed');
    }

    // Return a response with the user data
    const responseBody = JSON.stringify(response.data);
    
    // Ensure you are only returning the response once
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
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
