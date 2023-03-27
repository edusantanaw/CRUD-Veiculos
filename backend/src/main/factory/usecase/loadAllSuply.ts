import { LoadAllUsecase } from "../../../data/usecases/loadAll";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeLoadAllSupplyUsecase(){
    const supplyRepository = new SupplyRepository()
    return new  LoadAllUsecase(supplyRepository)
}