import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";
import { Box } from "@mui/system";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);


  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
    //update this checked information into Parent Component
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <Box key={index} sx={{ display: "flex", m: 1 }}>
        <Checkbox
          onChange={() => handleToggle(value.brand_id)}
          type="checkbox"
          checked={Checked.indexOf(value.brand_id) === -1 ? false : true}
        />
        &nbsp;&nbsp;
        <span>{value.brand_name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Box>
    ));

  return <div>{renderCheckboxLists()}</div>;
}

export default CheckBox;
