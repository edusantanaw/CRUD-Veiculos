import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import SupplyForm from "../../../shared/components/form/SupplyForm";

export const boxStyles = {
  marginTop: "2em",
  width: "80%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1em 0.1em",
};

interface props {
  handleCreate: (
    data: any
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
          <SupplyForm handleClose={handleModal} handleCreate={handleCreate} />
        </Box>
      </Modal>
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
