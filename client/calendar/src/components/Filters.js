import React, {useState, useEffect} from 'react';
import './Filters.css';
import CheckBoxContainer from './CheckBoxContainer';

function Filters(props) {
    const [checked, setChecked] = useState([]);
    const [priorities, setPriorities] = useState([
        {key: "High", value: "high", isChecked: true},
        {key: "Normal", value: "normal", isChecked: true},
        {key: "Low", value: "low", isChecked: false}
    ]);

    const [modesOfTransport, setModes] = useState([
        {key: "Metro", value: 2, isChecked: false},
        {key: "Train", value: 1, isChecked: true},
        {key: "Bus", value: 5, isChecked: false},
        {key: "Ferry", value: 9, isChecked: false},
        {key: "Light Rail", value: 4, isChecked: false}
    ]);

    const [checkedFilters, setFilter] = useState([...priorities, ...modesOfTransport]);
    //update checkedFilters according to what is checked

    // Update local checked
    const sendChecked = (data) => {
        setChecked(data);
        
    }
    const updateFilter = () => {
        let [value, c] = checked;
        let filterArr = checkedFilters.map(f =>{
            if (f.value == value)
                return Object.assign({}, f, {isChecked:c})
            return f
        });
        setFilter(filterArr);
    }

    // Send checked value to parent
    useEffect(() => {
        updateFilter();
        props.sendChecked(checkedFilters);
    }, [checked]);

    return (
        <div className="filters">
            <label>Filters:</label>
            <div className="filterContainer">
                <div className="grid-item grid-item-1">
                    <div className="priorityContainer">
                        <CheckBoxContainer
                            title="Priority"
                            values={priorities}
                            sendChecked={sendChecked}
                        ></CheckBoxContainer>
                    </div>
                    
                </div>
                <div className="grid-item grid-item-2">
                    <div className="modeContainer">
                    <CheckBoxContainer
                            title="Mode"
                            values={modesOfTransport}
                            sendChecked={sendChecked}
                            ></CheckBoxContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters
