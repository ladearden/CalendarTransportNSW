import React, {useState, useEffect} from 'react';

function Checkbox(props) {
    const [checked, setChecked] = useState(props.isChecked);
    const [checkbox, setCheckbox] = useState([{value: props.value, isChecked: props.isChecked}]);
    
    function handleChange(event) {
        setChecked(event.target.checked);
        setCheckbox([event.target.value,event.target.checked]);
    }

    useEffect(() => {
        props.sendChecked(checkbox);
    });

    return (
        <div>
            <label className="form-check-label">
                <input type="checkbox" className="filterCheckbox" value={props.value} onChange={handleChange}
                checked={checked}></input>
                {props.label}
            </label>
        </div>
    )
}

export default Checkbox
