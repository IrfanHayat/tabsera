import React, { useState } from 'react'
// import { Checkbox, Collapse } from 'antd';

// const { Panel } = Collapse
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Collapse1 from '../Collapse';
import { Grid, Box } from "@mui/material";
import List from "@mui/material/List";
import styles from "../../styles/sidebarFilters.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
function CheckBox1({ data, handleFilters }) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        handleFilters(newChecked)


    }

    const renderCheckboxLists = () => data && data.map((value, index) => (

        <div>
            <FormGroup key={index}>
                <FormControlLabel
                    control={
                        <Checkbox onChange={() => handleToggle(value.brand_id)} name={value.brand_name} />
                    }
                    label={value.brand_name}
                />
            </FormGroup>
        </div>


    ))

    return (
        <div>
            <Collapse1 name="Brands">
                <Typography className={styles.categoryHeading}>Brands</Typography>
                <Box className={styles.brandsList}>
                    {renderCheckboxLists()}
                </Box>
            </Collapse1>
        </div>
    )
}

export default CheckBox1