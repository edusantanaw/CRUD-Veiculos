import { LoadByIdController } from "../../../presentational/controllers/loadById";
import { ICar } from "../../../types/car";
import { makeLoadCarByIdUsecase } from "../usecase/loadCarById";

export function makeLoadCarByIdController() {
  const loadCarByIdUsecase = makeLoadCarByIdUsecase();
  return new LoadByIdController(loadCarByIdUsecase);
}
