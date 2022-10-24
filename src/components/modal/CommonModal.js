import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

const CommonModal = ({
  children,
  dialogTitle,
  width,
  ariaLabel,
  openModal,
  textAlign,
  handleSubmit,
  handleClose,
  btnPrimaryTxt,
}) => {
  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      fullWidth
      maxWidth={width}
      PaperProps={{
        style: {
          backgroundColor: "#F2F5F9",
        },
      }}
    >
      <DialogTitle textAlign={textAlign} aria-labelledby={ariaLabel}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{btnPrimaryTxt}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
