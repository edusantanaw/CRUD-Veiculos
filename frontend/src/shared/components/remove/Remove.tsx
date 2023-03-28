import { Box, Button, Modal, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import ModalComponent from "../modal/ModalComponent";

type byId = {
  id: string;
};

const boxStyles = {
  width: "25em",
  background: "#fff",
  padding: "1.5em",
  borderRadius: "5px",
};

interface props<T, R> {
  handleModal: (item: T) => void;
  open: boolean;
  service: (id: string) => Promise<R>;
  item: T;
}

function Remove<T extends byId, R>({
  open,
  service,
  handleModal,
  item,
}: props<T, R>) {
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      await service(item.id);
    } catch (error) {
      const message = error as AxiosError<string>;
      setError(() => message.response!.data);
    }
  }

  return (
    <ModalComponent handleModal={handleModal} open={open}>
      <Box sx={boxStyles}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "1.3em", paddingBottom: "1em" }}
        >
          Realmente deseja excluir esse item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{ width: "48%", height: "3.1em" }}
            size="large"
            variant="contained"
            color="success"
            onClick={handleDelete}
          >
            Sim
          </Button>
          <Button
            sx={{ width: "48%", height: "3.1em" }}
            variant="contained"
            color="error"
            onClick={() => handleModal(item)}
          >
            Nao
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </ModalComponent>
  );
}

export default Remove;
