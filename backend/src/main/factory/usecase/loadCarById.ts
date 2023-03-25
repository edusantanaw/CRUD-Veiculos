import { LoadByIdUsecase } from "../../../data/usecases/loadById";
import { CarRepository } from "../../../infra/repository/car";

export function makeLoadCarByIdUsecase() {
  const carRepository = new CarRepository();
  return new LoadByIdUsecase(carRepository);
}
