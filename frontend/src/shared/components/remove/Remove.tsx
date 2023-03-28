import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { AxiosError } from "axios";
import { ICar } from "../../types/car";

type byId = {
  id: string;
};

interface props<T, R> {
  handleModal: (item: T) => void;
  open: boolean;
  service: (id: string) => Promise<R>;
  item: T;
}

function Remove<T extends byId, R>({ open, service, handleModal, item }: props<T, R>) {
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
      <Box
        sx={{
          width: "25em",
          background: "#fff",
          padding: "1.5em",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "1.3em", paddingBottom: "1em" }}
        >
          Realmente deseja excluir esse carro?
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
          {error && <span>{error}</span>}
        </Box>
      </Box>
    </Modal>
  );
}

export default Remove;
