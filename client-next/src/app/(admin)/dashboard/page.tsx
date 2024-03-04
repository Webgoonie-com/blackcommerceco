"use client"

import { getAdminProfile } from '@/lib/cookieAuth'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';




const Dashboard = () => {

    const router = useRouter();

    const [admin, setAdmin] = useState(null);

    const fetchAdminProfile = async () => {

    try {

      const adminData = await getAdminProfile()

      

      if(adminData){
        setAdmin(adminData);
      }else{
        router.push("/administrator");
      }

    } catch (error) {
      console.error('Error fetching user profile:', error);
      
    }
  };

  useEffect(() => {

    fetchAdminProfile();

  },[])

  return (
      <div>
        Dashboard
        {JSON.stringify(admin, null, 2)}
      </div>
  )
}

export default Dashboard