import React, { useState } from "react";
import { deleteSupply } from "../../services/supply";
import RemoveCar from "../../shared/components/remove/Remove";
import { usePostOrPut } from "../../shared/hooks/usePostOrPutt";
import { dataSupply, ISupply } from "../../shared/types/supply";
import { Container } from "../../styles/Global";
import Index from "./components";
import EditSupply from "./components/EditSupply";
import Top from "./components/Top";

const Supply = () => {
  const [editSupply, setEditSupply] = useState(false);
  const [removeSupply, setRemoveSupply] = useState(false);
  const [supply, setSupply] = useState<ISupply | null>(null);

  const post = usePostOrPut<ISupply>({ method: "post" });

  function handleSupplyEdit(supply: ISupply | null) {
    setSupply(() => supply);
    setEditSupply((edit) => (edit ? false : true));
  }

  function handleRemoveSupplyModal(data: ISupply | null) {
    setSupply(() => data);
    setRemoveSupply((remove) => (remove ? false : true));
  }

  async function handleCreate(data: dataSupply) {
    const response = await post({ url: "/supply", data });
    return response;
  }

  return (
    <Container>
      <Top handleCreate={handleCreate} />
      <RemoveCar
        open={removeSupply}
        handleModal={handleRemoveSupplyModal}
        item={supply!}
        service={deleteSupply}
      />
      <EditSupply
        handleModal={handleSupplyEdit}
        open={editSupply}
        supply={supply!}
      />
      <Index
        handleEdit={handleSupplyEdit}
        handleRemove={handleRemoveSupplyModal}
        supply={supply}
      />
    </Container>
  );
};

export default Supply;
