import { Box } from "@mui/material";
import SupplyForm from "../../../shared/components/form/SupplyForm";
import ModalComponent from "../../../shared/components/modal/ModalComponent";
import { ISupply } from "../../../shared/types/supply";
import { handlePost } from "../../../shared/utils/postOrPut";

interface props {
  open: boolean;
  handleModal: (data: ISupply) => void;
  supply: ISupply;
}

const boxStyles = {
  background: "#fff",
  padding: "1em",
  borderRadius: "10px",
};

const EditSupply = ({ handleModal, supply, open }: props) => {
  async function handleUpdate(data: any) {
    const response = await handlePost({
      url: `/supply/${supply.id}`,
      data,
      method: "put",
    });
    return response;
  }

  return (
    <ModalComponent handleModal={handleModal} open={open}>
      <Box sx={boxStyles}>
        <SupplyForm
          handleClose={() => handleModal(supply)}
          handleCreate={handleUpdate}
          supply={supply}
        />
      </Box>
    </ModalComponent>
  );
};

export default EditSupply;
