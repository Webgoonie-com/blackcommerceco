'use client'


import React from 'react'

// use the interface for Range
import { Range } from 'react-date-range'

import Calendar from '@/Elements/Calendars/CalendarProperty';

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
                <h2>Property Reservation Spot on the right...</h2>
                <br />
            </div>
            <div className="
                    flex flex-row items-center gap-1 p-4
            "> 
                <div className="text-2xl font-semibold">
                    ${price}
                </div>
                <div className="font-light text-text-neutral-500">
                    per night
                </div>
            </div>

            <hr />

            <div
                className=""
            >

            </div>

            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div
                className="p-4 flex flex-row items-center justify-between font-semibold text-lg"
            >
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    )
}

export default ListingBapPropertyReservation