"use server"

import axios from 'axios'
import React from 'react'

export const callReservations = async (userId: any) => {
    try {
        const { data: reservations } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/all` 
            
        );

        //console.log('Line 33 api/reservations/all', reservations);
        
        return reservations;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export const callUserReservations = async (userId: any) => {
    try {
        const { data: reservations } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/listingsWithReservations` 
            
        );

        //console.log('Line 33 reservations', reservations);
        
        return reservations;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}