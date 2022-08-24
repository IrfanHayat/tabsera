import React from 'react'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




function SnackBarTool({ status, openBar, handleCloseBar }) {
    console.log(status)
    return (
        <div>{status?.resultCode === 2000 ? (
            <Snackbar
                open={openBar}
                autoHideDuration={6000}
                onClose={handleCloseBar}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
            >
                <Alert
                    onClose={handleCloseBar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {status?.message}
                </Alert>
            </Snackbar>

        ) : (

            <Snackbar
                open={openBar}
                autoHideDuration={2000}
                onClose={handleCloseBar}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
            >
                <Alert
                    onClose={handleCloseBar}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {status?.message}
                </Alert>
            </Snackbar>
        )}</div>
    )
}

export default SnackBarTool