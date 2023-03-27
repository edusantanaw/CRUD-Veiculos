import { useState } from "react";
import Top from "./components/car/Top";
import { HomeContainer } from "./styles";
import { Car } from "./components/car";

const Home = () => {
  const [editCar, setEditCar] = useState(false);
  const [removeCar, setRemoveCar] = useState(false);
  const [carEdit, setCarId] = useState("");

  function handleCarEdit(id: string) {
    setCarId(() => id);
    setEditCar((edit) => (edit ? false : true));
  }

  function handleRemoveCar(id: string) {
    setCarId(() => id);
    setRemoveCar((remove) => (remove ? false : true));
  }

  return (
    <HomeContainer>
      <Car handleEdit={handleCarEdit} handleRemove={handleRemoveCar} />
    </HomeContainer>
  );
};

export default Home;
