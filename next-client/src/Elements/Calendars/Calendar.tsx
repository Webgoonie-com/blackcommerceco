import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

// Let's Import The styles For React Date Range
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// value uses the interface from react-date-range
interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return (
                    
                
            <div className="grid grid-cols-1 divide-y">
                <div>
                    <h2 className="fw-bold p-2 text-white">Choose Your Dates Please...</h2>
                </div>
                <div className="text-center items-center p-2 w-full">
                    
                    <div id="fullCalendar" style={{ width: '100%' }}>
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
                    
                </div>
                
            </div>
    )
}

export default Calendar