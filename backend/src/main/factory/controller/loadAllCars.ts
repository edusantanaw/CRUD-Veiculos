import { LoadAllController } from "../../../presentational/controllers/loadAll";
import { makeLoadAllCarsUsecase } from "../usecase/loadAllCars";

export function makeLoadAllCarsController() {
  const loadAllCarsUsecase = makeLoadAllCarsUsecase();
  return new LoadAllController(loadAllCarsUsecase);
}
