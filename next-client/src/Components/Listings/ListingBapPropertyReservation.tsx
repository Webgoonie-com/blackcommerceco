'use client'


import React from 'react'

// use the interface for Range
import { Range } from 'react-date-range'

import CalendarProperty from '@/Elements/Calendars/CalendarProperty';
import Button from '@/Elements/Button';

interface ListingBapPropertyReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}
const ListingBapPropertyReservation: React.FC<ListingBapPropertyReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div
            className="
                bg-white 
                rounded-xl 
                border-[1px] 
                border-neutral-200 
                overflow-hidden
            "
        >
            <div className="flex flex-row p-4">
                
                <h2>Select A Date To Set Your Reservation For This Property.</h2>
                
                <hr />

                <br />

                <div className='flex flex-row'>
                    <small>Select Dates Below</small>
                </div>
               

                <hr />
            </div>
            <div className="
                    flex flex-row items-center gap-1 p-4
            "> 
                <div className="text-2xl font-semibold">
                    ${price}
                </div>
                <div className="font-light text-text-neutral-500">
                    per day & night
                </div>
            </div>

            <hr />

            <div
                className=""
            >

            </div>

            <CalendarProperty
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            
            <hr />

            <div className='p-4'>
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}
                />

            </div>

            <div
                className="p-4 flex flex-row items-center justify-between font-semibold text-lg"
            >
                <div>
                    Total Price:
                </div>
                <div>
                    $ {totalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default ListingBapPropertyReservation