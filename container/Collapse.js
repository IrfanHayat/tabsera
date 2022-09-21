import React, { useState, useCallback } from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function Collapse1({ name, children }) {
    const [open, setOpen] = useState(false)
    const handleCollapse = useCallback(() => {
        setOpen(!open)
    }, [open])
    return (
        <div>
            <ListItem button onClick={handleCollapse}>
                <ListItemText primary={name} />
                {open ? <><ExpandLess /></> : <ExpandMore />}
            </ListItem>
            <Collapse

                in={open}
                timeout='auto'
                unmountOnExit
            >{children}
            </Collapse>
        </div>
    )
}

export default Collapse1