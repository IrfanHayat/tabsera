import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

const NewSelect = ({ Title, Data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open1 = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        sx={{ color: "white" }}
        id="basic-button"
        aria-controls={open1 ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? "true" : undefined}
        onClick={handleClick1}
      >
        {Title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Data}
      </Menu>
    </>
  );
};

export default NewSelect;
