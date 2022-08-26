import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse



function CheckBox(props) {


    const [Checked, setChecked] = useState([])

    console.log(props)
    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];
        console.log(newChecked)
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value.brand_id)}
                type="checkbox"
                checked={Checked.indexOf(value.brand_id) === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>{value.brand_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
    ))

    return (
        <div>

            {renderCheckboxLists()}


        </div>
    )
}

export default CheckBox