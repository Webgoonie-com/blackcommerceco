import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

// Let's Import The styles For React Date Range
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// value uses the interface from react-date-range
interface CalendarPropertyProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const CalendarProperty: React.FC<CalendarPropertyProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return (
                    
                
            <div className="grid grid-cols-1 divide-y">
                <div>
                    <h2 className="fw-bold p-2">CalendarProperty</h2>
                </div>
                <div className="text-center items-center p-2">
                    <DateRange
                        rangeColors={["#262626"]}
                        ranges={[value]}
                        date={new Date()}
                        onChange={onChange}
                        direction="vertical"
                        showDateDisplay={false}
                        minDate={new Date()}
                        disabledDates={disabledDates}
                    />
                    
                </div>
                <div className="p-2">
                    <p>Below CalendarProperty</p>
                </div>
            </div>
    )
}

export default CalendarProperty