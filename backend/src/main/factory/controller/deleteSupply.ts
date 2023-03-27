import { DeleteController } from "../../../presentational/controllers/delete";
import { makeDeleteSupplyUsecase } from "../usecase/deleteSupply";

export function makeDeleteSupplyController() {
  return new DeleteController(makeDeleteSupplyUsecase());
}
