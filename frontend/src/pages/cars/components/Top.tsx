import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CarForm from "../../../shared/components/form/CarForm";

type dataCreate = {
  model: string;
  color: string;
  licensePlate: string;
  power: number;
  brand: string;
  renavam: string;
};

export const boxStyles = {
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em 0.1em",
};

interface props {
  handleCreate: (
    data: dataCreate
  ) => Promise<{ error: string | null; loading: boolean }>;
}
const Top = ({ handleCreate }: props) => {
  const [model, setModal] = useState<boolean>(false);

  function handleModal() {
    setModal((current) => (current ? false : true));
  }

  return (
    <Box sx={boxStyles}>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={model}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            background: "#fff",
            padding: "1em",
            borderRadius: "10px",
          }}
        >
          <CarForm handleClose={handleModal} handleCreate={handleCreate} />
        </Box>
      </Modal>
      <Typography fontSize="1.5em">Carros</Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<AddCircleIcon />}
        onClick={handleModal}
      >
        Novo
      </Button>
    </Box>
  );
};

export default Top;
