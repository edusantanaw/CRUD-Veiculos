import { UpdateCarUsecase } from "../../../data/usecases/updateCar";
import { CarRepository } from "../../../infra/repository/car";

export function makeUpdateCarUsecase() {
  const carRepository = new CarRepository();
  return new UpdateCarUsecase(carRepository);
}
