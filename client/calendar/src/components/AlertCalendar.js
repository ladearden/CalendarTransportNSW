import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RouteStatus from './RouteStatus';
import './AlertCalendar.css';
import Title from './Title';
import Filters from './Filters';

function AlertCalendar() {
    const [date, onChange] = useState(new Date());
    const [checked, setChecked] = useState([]);

    const sendChecked = (data) => {
        setChecked(data);
    }
    // When a date is clicked the route status changes
    return (
        <div>
            <Title></Title>
            <div className="transportCalendar">
                
                <div className="calendarFilterContainer">
                    <Calendar className="calendarComponent"
                        onChange={onChange}
                        value={date}
                    >
                    </Calendar>
                    <Filters sendChecked={sendChecked}></Filters>
                </div>
                <RouteStatus        
                            className="statusComponent"
                            date={date}
                            checkedFilters={checked}
                             ></RouteStatus>
                {/* <FilterConsumer>
                {
                    (checked) => {
                        return (
                            
                        )
                        
                    }

                }
                </FilterConsumer> */}
                
            </div>
        </div>
    );
}

export default AlertCalendar