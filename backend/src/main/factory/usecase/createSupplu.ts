import { CreateSupplyUsecase } from "../../../data/usecases/createSupply";
import { CarRepository } from "../../../infra/repository/car";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeCreateSupplyUsecase() {
  const carRepository = new CarRepository();
  const supplyRepository = new SupplyRepository();
  return new CreateSupplyUsecase(carRepository, supplyRepository);
}
