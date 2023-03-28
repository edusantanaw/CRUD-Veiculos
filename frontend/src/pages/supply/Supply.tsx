import { useState } from "react";
import { deleteService } from "../../services/delete";
import RemoveSupply from "../../shared/components/remove/Remove";
import { ISupply } from "../../shared/types/supply";
import { Container } from "../../styles/Global";
import Index from "./components";
import EditSupply from "./components/EditSupply";

const Supply = () => {
  const [editSupply, setEditSupply] = useState(false);
  const [removeSupply, setRemoveSupply] = useState(false);
  const [supply, setSupply] = useState<ISupply | null>(null);

  function handleSupplyEdit(supply: ISupply | null) {
    setSupply(() => supply);
    setEditSupply((edit) => (edit ? false : true));
  }

  function handleRemoveSupplyModal(data: ISupply | null) {
    setSupply(() => data);
    setRemoveSupply((remove) => (remove ? false : true));
  }

  return (
    <Container>
      <RemoveSupply
        open={removeSupply}
        handleModal={handleRemoveSupplyModal}
        item={supply!}
        service={deleteService}
        url="supply"
      />
      <EditSupply
        handleModal={handleSupplyEdit}
        open={editSupply}
        supply={supply!}
      />
      <Index
        dependeces={[editSupply, removeSupply]}
        handleEdit={handleSupplyEdit}
        handleRemove={handleRemoveSupplyModal}
      />
    </Container>
  );
};

export default Supply;
