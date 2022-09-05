import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Modal({
  heading,
  buttonText,
  dialogContentText,
  buttonCancel,
  show,
  close,
  buttonTitle,
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleModalOpen}>{buttonTitle}</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{heading}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {buttonCancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
