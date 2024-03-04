"use client"

import { getAdminProfile } from '@/lib/cookieAuth'
import { useEffect, useState } from 'react';




const Dashboard = () => {

    const [admin, setAdmin] = useState(null);

    const fetchAdminProfile = async () => {

    try {

      const adminData = await getAdminProfile()

      setAdmin(adminData);
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