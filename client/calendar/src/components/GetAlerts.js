import React, { useState, useEffect } from 'react';

const fetchAlertsFromServer = async () => {
    const data = await fetch('http://localhost:3300/api');

    //const { version } = await data.json();
    const alerts = await data.json();
    console.log(alerts);
    return alerts;
}


const GetAlerts = ({sendAlertsToRouteStatus}) => {
    const [alerts, setAlerts] = useState(() => fetchAlertsFromServer());
    const [alertsInfo, setInfo] = useState([]);

    
    alerts.then((res) => {
        setInfo(res);
    })

    useEffect(() => {
        sendAlertsToRouteStatus(alertsInfo);
    });
    
    return (
        <div>
            
        </div>
    );
}

export default GetAlerts