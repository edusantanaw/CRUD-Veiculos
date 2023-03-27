import { LoadByIdController } from "../../../presentational/controllers/loadById";
import { makeLoadSupplyByIdUsecase } from "../usecase/loadSupplyById";

export function makeLoadSupplyByIdController() {
  return new LoadByIdController(makeLoadSupplyByIdUsecase());
}
