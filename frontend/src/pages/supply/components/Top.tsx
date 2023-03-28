import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SupplyForm from "../../../shared/components/form/SupplyForm";
import ModalComponent from "../../../shared/components/modal/ModalComponent";
import { boxStyles } from "../../../styles/Global";

interface props {
  handleCreate: (data: any) => Promise<{ message?: string }>;
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
          <SupplyForm handleClose={handleModal} handleCreate={handleCreate} />
        </Box>
      </ModalComponent>
      <Typography fontSize="1.5em">Reabastecer</Typography>
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
