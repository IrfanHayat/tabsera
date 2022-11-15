import React, { useState, useEffect } from "react";
import axios from "axios";
import { width } from "@mui/system";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import MapGL, { Marker } from "react-map-gl";
import Card from "@mui/material/Card";
import RoomIcon from "@mui/icons-material/Room";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import isValidCoordinates from 'is-valid-coordinates';
import Collapse from "@mui/material/Collapse";


const TOKEN =
    "pk.eyJ1IjoiaHVjaGVuc2NiIiwiYSI6ImNqdHpnbGZ5ejFneXEzeW81a3B3anJkZGoifQ.RjMCIQBbS0dlzTl85EogQw";
import { Box, Grid } from "@mui/material";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
const LockerDetails1 = ({ handleChangeLocker, setRadioCheck1, data }) => {

    const [details, setDetails] = useState(undefined);
    const [expanded, setExpanded] = React.useState(-1);
    const [viewport, setViewPort] = React.useState({
        latitude: 33.73279912866968,
        longitude: 73.08820371708458,
        zoom: 12
    });

    // const onSubscribeButton = async (id) => {
    //   try {
    //     const { data } = await axiosInstance.post(`${ApiBaseUrl}/users/lockerators/subscriptions`, {
    //       userId: user.user_id,
    //       lockeratorId: id,
    //     });
    //     console.log("data ==> ", data);
    //     if (data.responseCode === 2000) {
    //       toast.success("Successfully Subscribed");
    //       router.push("/merchants/lockeratorList");
    //     } else {
    //       console.log("else");
    //     }
    //   } catch (err) {
    //     console.log("error => ", err);
    //   }

    //   // dispatch({
    //   //   type: "LOCKER",
    //   //   payload: { id, name, totalLockers, slots, lockers },
    //   // });
    //   // router.push("/merchants/packages");
    // };
    const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
    };


    useEffect(() => {
        data?.map((result) => {
            setViewPort({
                latitude: result.latitude,
                longitude: result.longitude,
                zoom: 5,
            });
        });
    }, []);
    // const handleWarehouse = async (handleChangeLocker, setRadioCheck1, lockerData) => {

    //     let result = await axios.get(
    //         `http://115.186.185.229:5002/warehouses/inventory-items/?warehouseId=${warehouse.warehouseId}&warehouseLocationId=${warehouse.warehouseLocations[0].warehouseLocationId}&userId=159`

    //     );


    //     setDetails(result.data.response)
    // }


    return (
        <>
            <Grid container sx={{ minHeight: "20vh" }}>

                <RadioGroup
                    // row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={labelValue}
                    onChange={handleChangeLocker}
                >
                    <Grid item xs={12} md={12} sx={{ overflowY: "scroll", height: 300 }}>
                        {data &&
                            data.map((locker, i) => {
                                return (
                                    <Card key={i} sx={{ minWidth: 345, marginTop: "20px", padding: "0px" }}>
                                        <CardContent sx={{ padding: "0px 40px" }}>
                                            <FormControlLabel
                                                value={locker.locker_id}
                                                control={<Radio />}
                                                label={
                                                    <Box

                                                    >
                                                        {/* <Image // className={cx(styles.media, mediaStyles.root)}
                        src={"/locker_pic.jpg"}
                        // onClick={(e) => viewCategory(product.category_id)}
                        alt={"locker"}
                        width={45}
                        objectFit="contain"
                        height={45}
                      ></Image> */}
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {locker.locker_name}
                                                        </Typography>
                                                        <Typography variant="body2">Description: {locker.locker_address
                                                        }</Typography>
                                                        {/* <Button size="small" onClick={() => handleExpandClick(i)}>
                                                            View Charge Plans
                                                            <ExpandMore
                                                                expand={expanded}
                                                                aria-expanded={expanded}
                                                                aria-label="show more"
                                                            >
                                                                <ExpandMoreIcon />
                                                            </ExpandMore>
                                                        </Button> */}
                                                    </Box>
                                                }
                                                onClick={() => setRadioCheck1(true)}
                                            />




                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                width: 1000,
                                height: 500,
                                padding: "0px",
                            }}
                        >
                            <MapGL
                                mapStyle="mapbox://styles/mapbox/streets-v11"
                                {...viewport}
                                width="100%"
                                height="100%"
                                onViewportChange={(viewport) => setViewPort(viewport)}
                                mapboxApiAccessToken={TOKEN}
                            >
                                {
                                    data?.map((locker, i) => {

                                        return (
                                            isValidCoordinates(locker.longitude, locker.latitude) == true ?
                                                <>
                                                    <Marker key={i} latitude={locker.latitude == 0 ? 33.7327893 : locker.latitude} longitude={locker.longitude == 0 ? 73.0883404 : locker.longitude}
                                                        anchor="bottom">
                                                        <RoomIcon style={{ color: "red" }}></RoomIcon>
                                                    </Marker>
                                                </> : <></>
                                        )
                                    })
                                }

                            </MapGL>
                            {/* <MapGL
                                mapStyle="mapbox://styles/mapbox/streets-v11"
                                {...viewport}
                                width="100%"
                                height="100%"
                                onViewportChange={(viewport) => setViewPort(viewport)}

                                mapboxApiAccessToken={TOKEN}
                            >

                                {
                                    data && data.map((locker, i) => {
                                        
                                        return (
                                            <Marker key={i} longitude={locker.longitude} latitude={locker.latitude}>
                                                <Image src="/pin.svg" width={30} height={30} />
                                            </Marker>
                                        )


                                    })
                                }



                            </MapGL> */}

                        </Box>
                    </Grid>
                </RadioGroup></Grid>


            {/* {
                details && <Grid mt={5} container spacing={2}>
                    <Typography ml={3} variant="h4">Inventory Details</Typography> */}
            {/* <Grid item md={6}>
        Origin{" "}
      </Grid> */}
            {/* <Grid item md={6}>
        Destination
      </Grid> */}
            {/* <Grid item md={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Product Name
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Product ID
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            SKU
                                        </TableCell>

                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Product Code
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Quantity
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {details && details.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.productId}</TableCell>
                                            <TableCell align="left">{row.sku}</TableCell>
                                            <TableCell align="left">{row.productCode}</TableCell>
                                            <TableCell align="left">{row.salePrice}</TableCell>
                                            <TableCell align="left">{row.quantity}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid> */}
            {/* </Grid>
            } */}
        </>
    );
};

export default LockerDetails1;