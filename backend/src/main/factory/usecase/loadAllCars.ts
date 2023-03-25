import { LoadAllUsecase } from "../../../data/usecases/loadAll";
import { CarRepository } from "../../../infra/repository/car";

export function makeLoadAllCarsUsecase() {
  const carRepository = new CarRepository();
  return new LoadAllUsecase(carRepository);
}
