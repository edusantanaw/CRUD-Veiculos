import React from "react";
import CarForm from "../../../shared/components/form/CarForm";
import { Modal, Box } from "@mui/material";
import { ICar } from "../../../shared/types/car";
import { usePostOrPut } from "../../../shared/hooks/usePostOrPutt";

interface props {
  open: boolean;
  handleModal: (data: ICar) => void;
  car: ICar;
}

const EditCar = ({ handleModal, car, open }: props) => {
  const put = usePostOrPut<ICar>({ method: "put" });

  async function handleUpdate(data: any) {
    const response = await put({ url: `/car/${car.id}`, data });
    return response;
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
          background: "#fff",
          padding: "1em",
          borderRadius: "10px",
        }}
      >
        <CarForm
          handleClose={() => handleModal(car)}
          handleCreate={handleUpdate}
          car={car}
        />
      </Box>
    </Modal>
  );
};

export default EditCar;
