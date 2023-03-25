import { DeleteUsecase } from "../../../data/usecases/delete";
import { CarRepository } from "../../../infra/repository/car";

export function makeDeleteCarUsecase() {
  const carRepository = new CarRepository();
  return new DeleteUsecase(carRepository);
}
