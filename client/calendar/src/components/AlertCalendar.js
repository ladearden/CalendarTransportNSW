import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RouteStatus from './RouteStatus';
import './AlertCalendar.css'

function AlertCalendar() {
    const [date, onChange] = useState(new Date());
    
    // When a date is clicked the route status changes
    return (
        <div>
            <div className="transportCalendar">
                
                <Calendar className="calendarComponent"
                    onChange={onChange}
                    value={date}
                >
                </Calendar>
                <RouteStatus date={date} ></RouteStatus>
                
            </div>
        </div>
    );
}

export default AlertCalendar