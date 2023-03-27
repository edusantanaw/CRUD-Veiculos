import { DeleteUsecase } from "../../../data/usecases/delete";
import { SupplyRepository } from "../../../infra/repository/supply";

export function makeDeleteSupplyUsecase(){
    const supplyRepository = new SupplyRepository()
    return new DeleteUsecase(supplyRepository)
}