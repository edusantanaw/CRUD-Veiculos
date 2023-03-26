import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import NewCar from "./NewCar";
import { boxStyles } from "./styles";

const Top = () => {
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
        <NewCar />
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
