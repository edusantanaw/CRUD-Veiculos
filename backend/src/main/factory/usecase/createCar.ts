import { CreateCarUsecase } from "../../../data/usecases/createCar";
import { CarRepository } from "../../../infra/repository/car";

export function makeCreateCarUsecase() {
  const carRepository = new CarRepository();
  return new CreateCarUsecase(carRepository);
}
