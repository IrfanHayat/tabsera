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
export default function NavSelect({
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
        // component="link"
        className={styles.categoriesButton}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { width },
          height: "40px",
          bgcolor: "#F4F7FB",
          // wrap: "noWrap",
          p: 1,
          pl: 3.5,
          // fontFamily: "monospace",
          // fontWeight: 300,
          color: { color },
          textDecoration: "none",
          textTransform: "capitalize",
          ":hover": {
            cursor: "pointer",
          },
        }}
        // startIcon={startIcon}
        // endIcon={isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {/* <KeyboardArrowRightIcon /> */}
        <Box sx={{ display: "flex" }}>
          <Box display="inline" sx={{ mr: 1 }}>
            {startIcon}
          </Box>
          <Typography display="inline" sx={{ pt: 0.3 }}>
            {" "}
            {Title}{" "}
          </Typography>
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
        // sx={{ ml: 3 }}
        onClick={handleClose}
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
