import { IUpdateUsecase } from "../../domain/usecases/update";
import { ISuplly } from "../../types/supply";
import { IUpdateRepository } from "../protocols/repository/updateSupply";

export class UpdateSupplyUsecase implements IUpdateUsecase<ISuplly, ISuplly> {
    constructor(private readonly supplyRepository: IUpdateRepository<ISuplly>) {}
  
    public async update(data: ISuplly): Promise<ISuplly> {
      const supplyExists = await this.supplyRepository.loadById(data.id);
      if (!supplyExists) throw new Error("Abastecimento não encontrado!");
      const updated = await this.supplyRepository.update(data);
      return updated;
    }
  }