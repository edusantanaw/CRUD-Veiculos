import React from "react";
import { Modal, Box } from "@mui/material";

interface props {
  handleModal: (data: any) => void;
  open: boolean;
  children: JSX.Element;
}

const ModalComponent = ({children, handleModal, open}: props) => {
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >     
        {children}
    </Modal>
  );
};

export default ModalComponent;
