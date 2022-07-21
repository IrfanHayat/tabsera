import { OpenInFullSharp } from "@mui/icons-material";
import React from "react";
import PaymentModal from "../../container/PaymentModal//PaymantModal";

const Index = ({confirmPayment}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* payemet */}
      <PaymentModal  confirmPayment={confirmPayment} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>
    </div>
  );
};

export default Index;
