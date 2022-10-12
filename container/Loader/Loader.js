import { Grid, Box } from "@mui/material";
import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    return (
        <Grid container>
            <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                sx={{ width: "100%", minHeight: "550px" }}
            >
                <HashLoader size={90} color="#03c9d7" />
            </Box>
        </Grid>
    );
};

export default Loader;