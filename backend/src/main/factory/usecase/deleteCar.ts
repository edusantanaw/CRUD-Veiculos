import { DeleteCarUsecase } from "../../../data/usecases/deleteCar";
import { CarRepository } from "../../../infra/repository/car";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeDeleteCarUsecase() {
  const carRepository = new CarRepository();
  const supplyRepository = new SupplyRepository();
  return new DeleteCarUsecase(supplyRepository, carRepository);
}
