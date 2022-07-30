import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// import { ListItemIcon, ContentCopy, ListItemText } from "@mui/material";
import { Link, Typography } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";
export default function Categories({ Title, Data, clr, startIcon }) {
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
        // component="link"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        // underline="hover"
        sx={{
          wrap: "noWrap",
          color: "black",
          textDecoration: "none",
          textTransform: "capitalize",
          m: 1,
          p: 1,
          ":hover": {
            // boxShadow: 20, // theme.shadows[20]
            transform: "scale(1.1)",
            // color: "white",
            transformOrigin: "bottomleft",
            // opacity: 0.5,
            cursor: "pointer",
          },
        }}
        startIcon={startIcon}
        endIcon={
          isActive ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )
        }
      >
        {/* <KeyboardArrowRightIcon /> */}
        <Typography> {Title}</Typography>
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
            overflow: "visible",

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
        <Typography> {Data}</Typography>
      </Menu>
    </>
  );
}
