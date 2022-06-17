import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const AddPagination = ({ page = 10, setPage }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div>
      <Pagination
        // onChange={(e) => handleChange(e.target.textConstant)}
        count={10}
        color="primary"
      />
    </div>
  );
};

export default AddPagination;
