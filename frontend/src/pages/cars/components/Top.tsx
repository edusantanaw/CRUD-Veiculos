import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CarForm from "../../../shared/components/form/CarForm";
import ModalComponent from "../../../shared/components/modal/ModalComponent";
import { dataCreate } from "../../../shared/types/car";
import { boxStyles } from "../../../styles/Global";

interface props {
  handleCreate: (
    data: dataCreate
  ) => Promise<{ error: string | null; loading: boolean }>;
}
const box = {
  background: "#fff",
  padding: "1em",
  borderRadius: "10px",
};

const Top = ({ handleCreate }: props) => {
  const [model, setModal] = useState<boolean>(false);

  function handleModal() {
    setModal((current) => (current ? false : true));
  }

  return (
    <Box sx={boxStyles}>
      <ModalComponent handleModal={handleModal} open={model}>
        <Box sx={box}>
          <CarForm handleClose={handleModal} handleCreate={handleCreate} />
        </Box>
      </ModalComponent>
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
