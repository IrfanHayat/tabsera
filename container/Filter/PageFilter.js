import React from "react";
import { FormControl } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import FormControlLabel from "@mui/material/FormControlLabel";
import { motion } from "framer-motion";
function PageFilter({ value, handleChange }) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
      >
        <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
          <FormControlLabel
            value="deals"
            control={<Radio onChange={handleChange} />}
            label="Bundles"
          />
        </motion.div>
        <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
          <FormControlLabel
            value="discounts"
            control={<Radio onChange={handleChange} />}
            label="Discounts"
          />
        </motion.div>
        <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
          <FormControlLabel
            value="freeShipping"
            control={<Radio onChange={handleChange} />}
            label="freeShipping"
          />
        </motion.div>
      </RadioGroup>
    </FormControl>
  );
}

export default PageFilter;
