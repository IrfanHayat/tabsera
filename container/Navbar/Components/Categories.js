import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
// import { ListItemIcon, ContentCopy, ListItemText } from "@mui/material";
import { IconButton, Link } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/menu.module.css";

export default function Categories({
  Title,
  Data,
  clr,
  startIcon,
  color,
  width,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setIsActive(!isActive);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsActive(!isActive);
    setAnchorEl(null);
  };
  const linkcolor = "black";
  return (
    <>
      {/* <Link></Link> */}
      <Button
        className={styles.categories}
        // component="link"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        // sx={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   width: { width },
        //   // wrap: "noWrap",
        //   fontFamily: "monospace",
        //   fontWeight: 300,
        //   color: { color },
        //   textDecoration: "none",
        //   textTransform: "capitalize",
        //   ":hover": {
        //     cursor: "pointer",
        //   },
        // }}
        // startIcon={startIcon}
        // endIcon={isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {/* <KeyboardArrowRightIcon /> */}
        <Box sx={{ display: "flex" }}>
          <Box display="inline" sx={{ mr: 1 }}>
            {startIcon}
          </Box>
          <Typography display="inline"> {Title} </Typography>
        </Box>
        <Box>
          {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </Button>

      <Menu
        // sx={{ width: 320, maxWidth: "100%" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClick={handleClose}
        PaperProps={{
          // elevation: 0,
          sx: {
            // overflow: "visible",

            // width: 202,
            // filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            // mt: 1.5,
            // "& .MuiAvatar-root": {
            //   width: 52,
            //   height: 32,
            //   ml: -0.5,
            //   mr: 1,
            // },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}> */}
        {/* <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText> */}
        <Typography> {Data} </Typography>
        {/* </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </>
  );
}
