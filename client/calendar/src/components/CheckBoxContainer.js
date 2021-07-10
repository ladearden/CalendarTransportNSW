import React, {useState, useEffect} from 'react'
import Checkbox from './Checkbox';

function CheckBoxContainer(props) {
    const values = [...props.values];
    const [checked, setChecked] = useState([]);

    const sendChecked = (data) => {
        setChecked(data);
    }

    useEffect(() => {
        props.sendChecked(checked);
    });

    return (
        <div>
            <label><strong>{props.title}</strong></label>
            <div className="checkboxes">
                {values.map(v => {
                    return (
                        <div className="checkboxContainer" key={v.key}>
                            <Checkbox value={v.value}
                                label={v.key}
                                sendChecked={sendChecked}
                                isChecked={v.isChecked}
                            ></Checkbox>
                        </div>
                    )
                })}
            </div>    
        </div>
    )
}

export default CheckBoxContainer
