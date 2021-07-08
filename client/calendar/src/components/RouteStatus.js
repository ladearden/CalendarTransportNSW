import React, { useState, useEffect } from 'react';
import RouteStatusCard from './RouteStatusCard';
import GetAlerts from './GetAlerts';

function formatDate(date) {
    return date.toLocaleDateString('en-GB');
  }

function checkDate(dateToCheck, startDate, endDate) {
    //console.log(`dateToCheck ${dateToCheck} startDate ${startDate} endDate ${endDate}`);
    return (dateToCheck >= startDate && dateToCheck <= endDate);
}


let cardCount = 0;

// Route Status must have the whole json object
function RouteStatus(props) {
    const [alerts, setAlerts] = useState([]);
    const [loaded, gotAlert] = useState(false);
    const [cards, setCount] = useState(0);
    const current = [];

    const sendAlertsToRouteStatus = (data) => {
        setAlerts(data);
    }

    

    useEffect(() => {
            cardCount = document.getElementsByClassName("card-container").length;
            if (cardCount <= 0) {
                document.getElementById("transportAlerts").innerHTML=`No alerts on ${formatDate(props.date)}`;
            }
            else {
                document.getElementById("transportAlerts").innerHTML="";
            }
            
           
    });

    return (
        <div>
            <GetAlerts sendAlertsToRouteStatus={sendAlertsToRouteStatus}></GetAlerts>
            <div id="transportAlerts"></div>
            {/* {alerts.version} */}
            {alerts? Object.keys(alerts).map(a => {
                const info = alerts[a];
                return (
                        <div key={a} >
                            {/* <div>{console.log(info.current)}</div> */}
                            <div>{info.current ? info.current.filter(c => {
                                                                            return !c.subtitle.includes("<a") && c.properties.speechText &&
                                                                                checkDate(formatDate(props.date),formatDate(new Date(c.timestamps.validity.flat()[0].from)),formatDate(new Date(c.timestamps.validity.flat()[0].to)))
                                                                        }).map(c => {
                                    return (
                                        
                                        <div key={c.id}>
                                            
                                            <RouteStatusCard
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
            {/* {<p>loading...</p>} */}
        </div>
    );
}

export default RouteStatus