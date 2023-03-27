import { LoadByIdUsecase } from "../../../data/usecases/loadById";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeLoadSupplyByIdUsecase() {
  const supplyRepository = new SupplyRepository();
  return new LoadByIdUsecase(supplyRepository);
}
