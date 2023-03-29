import { UpdateSupplyUsecase } from "../../../data/usecases/updateSupply";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeUpdateSuplyUsecase(){
    const supplyRepository = new SupplyRepository();
    return new UpdateSupplyUsecase(supplyRepository);
}