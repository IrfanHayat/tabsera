import React, { Component } from "react";
import style from "../styles/swipeButton.module.css";

import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
    Link,
    Card
} from '@mui/material';




const slider = React.createRef();
const container = React.createRef();
var isTouchDevice;



export default class CustomButton extends Component {
    state = {};


    componentDidMount() {

        if (window != undefined) {

            isTouchDevice = "ontouchstart" in document.documentElement;
        }
        if (isTouchDevice) {

            document.addEventListener("touchmove", this.onDrag);
            document.addEventListener("touchend", this.stopDrag);
        } else {
            document.addEventListener("mousemove", this.onDrag);
            document.addEventListener("mouseup", this.stopDrag);
        }
        this.containerWidth = container.current.clientWidth - 50;
    }

    onDrag = (e) => {
        if (this.unmounted || this.state.unlocked) return;
        if (this.isDragging) {
            if (isTouchDevice) {
                this.sliderLeft = Math.min(
                    Math.max(0, e.touches[0].clientX - this.startX),
                    this.containerWidth
                );
            } else {
                this.sliderLeft = Math.min(
                    Math.max(0, e.clientX - this.startX),
                    this.containerWidth
                );
            }
            this.updateSliderStyle();
        }
    };

    updateSliderStyle = () => {
        if (this.unmounted || this.state.unlocked) return;
        slider.current.style.left = this.sliderLeft + 50 + "px";
    };

    stopDrag = () => {
        if (this.unmounted || this.state.unlocked) return;
        if (this.isDragging) {
            this.isDragging = false;
            if (this.sliderLeft > this.containerWidth * 0.9) {
                this.sliderLeft = this.containerWidth;
                console.log("Success")
                console.log(this.sliderLeft)

                if (this.sliderLeft) {
                    console.log("Success")
                    //this.props.onSuccess();
                    this.onSuccess();
                }
            } else {
                this.sliderLeft = 0;
                if (this.props.onFailure) {
                    this.props.onFailure();
                }
            }
            this.updateSliderStyle();
        }
    };

    startDrag = (e) => {
        if (this.unmounted || this.state.unlocked) return;
        this.isDragging = true;
        if (isTouchDevice) {
            this.startX = e.touches[0].clientX;
        } else {
            this.startX = e.clientX;
        }
    };

    onSuccess = () => {
        container.current.style.width = container.current.clientWidth + "px";
        console.log(container.current.style.width)
        this.setState({
            unlocked: true
        });

        this.props.valueText(true)

    };

    getText = () => {
        return this.state.unlocked
            ? this.props.text_unlocked || "Swipe to get Code"
            : this.props.text || "";
    };

    reset = () => {
        if (this.unmounted) return;
        this.setState({ unlocked: false }, () => {
            this.sliderLeft = 0;
            this.updateSliderStyle();
        });
    };

    componentWillUnmount() {
        this.unmounted = true;
    }

    render() {
        return (
            <>
                {this.props.unLockVerification == true ? <> <this.props.Controller

                    name="verification_code"
                    control={this.props.control}
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 6,

                    }}
                    render={({ field }) => (
                        <TextField
                            sx={{ width: "390px" }}
                            variant="outlined"
                            fullWidth
                            id="verification_code"
                            label="Verification Code"
                            inputProps={{ type: 'name' }}
                            error={Boolean(this.props.errors.name)}
                            helperText={
                                this.props.errors.name
                                    ? this.props.errors.name.type === 'minLength'
                                        ? 'Verification Code length is more than 6'
                                        : 'Verification Code is required'
                                    : ''
                            }
                            {...field}
                        ></TextField>
                    )}
                ></this.props.Controller></> : <><div className={style.ReactSwipeButton}>
                    <div
                        className={
                            style.rsbContainer +
                            (this.state.unlocked ? "rsbContainerUnlocked" : "")
                        }
                        ref={container}
                    >
                        <div
                            className={style.rsbcSlider}
                            ref={slider}
                            onMouseDown={this.startDrag}
                            style={{ background: this.props.color }}
                            onTouchStart={this.startDrag}
                        >

                            <span
                                className={style.rsbcSliderCircle}
                            >
                                <span className={style.rsbcSliderArrow}></span>
                            </span>
                        </div>

                        <div className={style.rsbcText}>Swipe to get Code</div>

                    </div>
                </div></>}
            </>

        );
    }
}
