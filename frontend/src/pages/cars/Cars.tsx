import { useState } from "react";
import EditCar from "./components/EditCar";
import { ICar } from "../../shared/types/car";
import { Container } from "../../styles/Global";
import RemoveCar from "../../shared/components/remove/Remove";
import { Car } from "./components";
import { deleteService } from "../../services/delete";

const Cars = () => {
  const [editCar, setEditCar] = useState(false);
  const [removeCar, setRemoveCar] = useState(false);
  const [car, setCar] = useState<ICar | null>(null);

  function handleCarEdit(car: ICar | null) {
    setCar(() => car);
    setEditCar((edit) => (edit ? false : true));
  }

  function handleRemoveCarModal(data: ICar | null) {
    setCar(() => data);
    setRemoveCar((remove) => (remove ? false : true));
  }

  return (
    <Container>
      <EditCar handleModal={handleCarEdit} open={editCar} car={car!} />
      <RemoveCar
        url="car"
        service={deleteService}
        open={removeCar}
        item={car!}
        handleModal={handleRemoveCarModal}
      />
      <Car
        handleEdit={handleCarEdit}
        handleRemove={handleRemoveCarModal}
        dependeces={[editCar, removeCar]}
      />
    </Container>
  );
};

export default Cars;
