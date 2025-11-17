import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "600px",
  overflow: "scroll",
};

type TPropsCustomModal = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  sx?: object;
};

export default function CustomModal(props: TPropsCustomModal) {
  const { children, open, handleClose, sx } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sx ?? style}>{children}</Box>
      </Modal>
    </div>
  );
}
