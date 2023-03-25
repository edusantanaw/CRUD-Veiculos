import { LoadByIdController } from "../../../presentational/controllers/loadById";
import { makeLoadUserByIdUsecase } from "../usecase/loadUserById";

export function makeLoadUserByIdController() {
  return new LoadByIdController(makeLoadUserByIdUsecase());
}
