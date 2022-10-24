import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import MapGL, { Marker } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";
import styles from "../../styles/locker.module.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AssistantDirectionOutlinedIcon from "@mui/icons-material/AssistantDirectionOutlined";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
const TOKEN =
  "pk.eyJ1IjoiaHVjaGVuc2NiIiwiYSI6ImNqdHpnbGZ5ejFneXEzeW81a3B3anJkZGoifQ.RjMCIQBbS0dlzTl85EogQw";

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

const LockerDetails = ({ handleChangeLocker, setRadioCheck1, lockerData }) => {
  const [expanded, setExpanded] = React.useState(-1);
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

  const [viewport, setViewPort] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    zoom: 12,
  });
  useEffect(() => {
    lockerData?.map((result) => {
      setViewPort({
        latitude: result.latitude,
        longitude: result.longitude,
        zoom: 5,
      });
    });
  }, []);

  console.log("my lockerData => ", lockerData);
  return (
    <>
      <Grid container className={styles.lockerMain}>
        <Grid
          item
          md={3}
          className={styles.lockerDetails}
        // sx={{ overflowY: "scroll", height: 300 }}
        >
          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            // value={labelValue}
            onChange={handleChangeLocker}
          >

            <>
              {/* <CardContent sx={{ padding: "0px 20px" }}> */}
              {/* <Typography gutterBottom variant="h5" component="div">
                  {locker.business_name}
                </Typography> */}
              <Box className={styles.addressBoxDiv1}>
                <>


                  {lockerData?.map((locker, i) => (
                    <>
                      <FormControlLabel
                        value={locker.locker_id}
                        control={<Radio />}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* <Image // className={cx(styles.media, mediaStyles.root)}
                        src={"/locker_pic.jpg"}
                        // onClick={(e) => viewCategory(product.category_id)}
                        alt={"locker"}
                        width={45}
                        objectFit="contain"
                        height={45}
                      ></Image> */}
                            <Typography
                              sx={{
                                p: 1,
                              }}
                            >
                              {locker.locker_name}
                            </Typography>


                          </Box>
                        }
                        onClick={() => setRadioCheck1(true)}
                      />

                      <Typography variant="body2">
                        Loation : {locker.locker_address}
                      </Typography>
                      <>
                        <Button size="small" onClick={() => handleExpandClick(i)}>
                          View Charge Plans
                          <ExpandMore
                            expand={expanded}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>
                        </Button>
                        <Divider fullWidth />
                        {locker.isSubscribed ? (
                          <Button variant="contained" disabled={true}>
                            Subscribed
                          </Button>
                        ) : (
                          <></>
                          // <Button
                          //   color="secondary"
                          //   variant="contained"
                          //   onClick={() => onSubscribeButton(lockerData.user_id)}
                          // >
                          //   Subscribe
                          // </Button>
                        )}
                      </>
                      <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                        <CardContent>
                          {locker.charges.map((plans, i) => (
                            <Typography paragraph className={styles.charges}>
                              {plans.slot_size}
                            </Typography>

                          ))}

                          {/* <Typography paragraph>charge plans here</Typography> */}
                        </CardContent>
                      </Collapse>
                    </>
                  ))}




                </>
              </Box>
              <AssistantDirectionOutlinedIcon
                color="primary"
                fontSize="large"
              />
              {/* <Typography variant="body2">
                  Available Slots of Lockers: {locker.noOfLockerAvailableSlots}
                </Typography>
                <Typography variant="body2">
                  No of Vending Machines: {locker.noOfVendingMachines}
                </Typography>
                <Typography variant="body2">
                  Available Slots in Vending Machines: {locker.noOfVendingMachineAvailableSlots}
                </Typography> */}
              {/* </CardContent> */}
            </>

          </RadioGroup>
        </Grid>
        <Grid item md={9}>
          {/* hello */}
          <Box
            sx={{
              // width: 800,
              height: "100%",
              // m: 1,
              // padding: "0px",
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
                lockerData?.map((locker, i) => {
                  console.log("locker ==> ", locker);
                  return (
                    <Marker key={i} latitude={locker.latitude} longitude={locker.longitude}
                      anchor="bottom">
                      <RoomIcon style={{ color: "red" }}></RoomIcon>
                    </Marker>
                  )
                })
              }

            </MapGL>
            {/* <MapGL
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 8
              }}
              mapboxApiAccessToken={TOKEN}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/streets-v11"
            /> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LockerDetails;
