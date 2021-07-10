import React, { useState, useEffect, useContext } from 'react';
import RouteStatusCard from './RouteStatusCard';
import GetAlerts from './GetAlerts';

function formatDate(date) {
    return date.toLocaleDateString('en-GB');
  }

function checkDate(dateToCheck, startDate, endDate) {
    //console.log(`dateToCheck ${dateToCheck} startDate ${startDate} endDate ${endDate}`);
    return (dateToCheck >= startDate && dateToCheck <= endDate);
}

// Route Status must have the whole json object
function RouteStatus(props) {
    const [alerts, setAlerts] = useState([]);
    const [filters, setFilters] = useState([]);

    const sendAlertsToRouteStatus = (data) => {
        setAlerts(data);
    }

    const updateFilter = () => {
        let filter = props.checkedFilters.filter(f => f.isChecked)
                                            .map(v => v.value);
        setFilters(filter);
    }

    useEffect(() => {
        
        updateFilter();


    }, [props.checkedFilters]);

    //console.log(filters);
    

    return (
        <div>
            <GetAlerts sendAlertsToRouteStatus={sendAlertsToRouteStatus}></GetAlerts>
            <div id="transportAlerts"></div>
            {alerts? Object.keys(alerts).map(a => {
                const info = alerts[a];
                return (
                        <div key={a} >
                            <div>{info.current ? info.current.filter(c => {
                                                                            function modes() {
                                                                                if(typeof c.affected.lines !== 'undefined') {
                                                                                    let lines = Object.keys(c.affected.lines).map(function(_) { return c.affected.lines[_]; });
                                                                                    let [linesArr] = lines;
                                                                                    return linesArr.product.class;
                                                                                }
                                                                            }
                                                                            
                                                                            return !c.subtitle.includes("<a") && c.properties.speechText && filters.includes(c.priority) && filters.includes(modes()) &&
                                                                                checkDate(formatDate(props.date),formatDate(new Date(c.timestamps.validity.flat()[0].from)),formatDate(new Date(c.timestamps.validity.flat()[0].to)))
                                                                        }).map(c => {
                                    return (
                                        
                                        <div key={c.id}>
                                            
                                            <RouteStatusCard
                                            id={c.id}
                                            title={c.subtitle}
                                            dateAffected={c.timestamps.validity ? c.timestamps.validity.map(v => {
                                                return (
                                                    <div>
                                                        {`${formatDate(new Date(v.from))} - ${formatDate(new Date(v.to))}`}
                                                        {/* {` ${formatDate(props.date)} ${checkDate(formatDate(props.date),formatDate(new Date(v.from)),formatDate(new Date(v.to)))}`} */}
                                                        </div>
                                                )}) : null}
                                            body={c.properties.speechText}
                                            
                                            affected={c.affected.lines ? c.affected.lines.map(l => {
                                                return (
                                                    <div className="routesAffected">
                                                        <ul>
                                                            <li>
                                                                {l.description}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )
                                            }) : null}>

                                            </RouteStatusCard>
                                            
                                        </div>
                                    )
                            }) : null}</div>
                        </div>
                )
            }) : null}
            
        </div>
    );
}

export default RouteStatus