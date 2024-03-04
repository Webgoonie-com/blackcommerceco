"use client"

import { useEffect, useState } from 'react';
import { getUserProfile } from '@/lib/cookieAuth';
import { useRouter } from 'next/navigation';

const BackOffice = () => {
  
  const router = useRouter();

  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      // const userData = await getAdminProfile();
      const userData = await getUserProfile()
      
      console.log('userData', userData)

      if(userData){
        setUser(userData);
      }else{
        router.push("/userlogin");
      }

      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    

    fetchUserProfile();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      Trying Something
      {JSON.stringify(user, null, 2)}
    </div>
  );
};

export default BackOffice;
