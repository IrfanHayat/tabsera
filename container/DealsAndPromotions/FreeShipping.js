import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Collapse from "@mui/material/Collapse";
const FreeShipping = ({ freeShippingData, viewProduct }) => {
    console.log("freeShippingData New", freeShippingData);
    return (
        <>
            {console.log(freeShippingData)}
            {/* <ActionAreaCard /> */}
            {freeShippingData.map((result) => (
                <Card
                    onClick={(e) => viewProduct(result)}
                    sx={{
                        mx: 0.4,
                        my: 2,
                        // marginTop: 1,
                        // marginBottom: 1,
                        padding: 0.5,
                        // maxWidth: 300,
                        width: 250,
                        // maxWidth: 250,
                        height: 300,
                        ":hover": {
                            boxShadow: 5, // theme.shadows[20]
                            transform: "scale(1.05)",
                            // opacity: 0.5,
                            cursor: "pointer",
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={result?.productImage}
                        alt="green iguana"
                    />

                    <CardContent>
                        <Typography gutterBottom variant="overline" component="div">
                            {result.productName}
                        </Typography>

                        <Typography gutterBottom variant="overline" component="div">
                            Rs {result.productCost}
                        </Typography>
                        {result.isfreeShipping}
                        <Typography gutterBottom variant="overline" component="div">
                            {result.isfreeShipping}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};


export default FreeShipping