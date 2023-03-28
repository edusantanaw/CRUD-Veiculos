import { Box } from "@mui/material";
import CarForm from "../../../shared/components/form/CarForm";
import ModalComponent from "../../../shared/components/modal/ModalComponent";
import { ICar } from "../../../shared/types/car";
import { handlePost } from "../../../shared/utils/postOrPut";

interface props {
  open: boolean;
  handleModal: (data: ICar) => void;
  car: ICar;
}

const boxStyles = {
  background: "#fff",
  padding: "1em",
  borderRadius: "10px",
};

const EditCar = ({ handleModal, car, open }: props) => {
  async function handleUpdate(data: any) {
    const response = await handlePost({
      url: `/car/${car.id}`,
      data,
      method: "put",
    });
    return response;
  }

  return (
    <ModalComponent handleModal={handleModal} open={open}>
      <Box sx={boxStyles}>
        <CarForm
          handleClose={() => handleModal(car)}
          handleCreate={handleUpdate}
          car={car}
        />
      </Box>
    </ModalComponent>
  );
};

export default EditCar;
