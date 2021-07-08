import React from 'react'
import './RouteStatusCard.css'
import data from '../data/backupInfoTrain.json';



function RouteStatusCard(props) {

    return (
        <div>
            <div className="card-container">
                        <div className="card-title">
                            <h3>{props.title}</h3>
                        </div>
                        <div className="card-date">
                            {props.dateAffected}
                        </div>
                        <div className="card-body">
                            {props.body}
                        </div>
                        <div className="card-affected">
                            <strong>Routes Affected:</strong>
                            {props.affected}
                        </div>
                        
                    </div>
        </div>
        
        
    )
}

export default RouteStatusCard
