import React from 'react'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
function ViewFilter({ handleView }) {
    return (
        <Grid >
            <Typography>View :</Typography>
            <GridViewIcon onClick={() => handleView('grid')}></GridViewIcon>
            <ViewListIcon onClick={() => handleView('list')}></ViewListIcon>
        </Grid>

    )
}

export default ViewFilter