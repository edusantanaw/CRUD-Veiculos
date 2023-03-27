import { LoadAllController } from "../../../presentational/controllers/loadAll";
import { makeLoadAllSupplyUsecase } from "../usecase/loadAllSuply";

export function makeLoadAllSupplyController() {
  return new LoadAllController(makeLoadAllSupplyUsecase());
}
