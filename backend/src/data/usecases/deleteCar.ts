import { IDeleteUsecase } from "../../domain/usecases/delete";
import { ICar } from "../../types/car";
import { ISuplly } from "../../types/supply";
import { IDeleteRepository } from "../protocols/repository/delete";

interface ILoadByCarIdRepository {
  loadByCarId: (carId: string) => Promise<ISuplly[]>;
}

export class DeleteCarUsecase implements IDeleteUsecase {
  constructor(
    private readonly loadSupplyByCarID: ILoadByCarIdRepository,
    private readonly repository: IDeleteRepository<ICar>
  ) {}

  public async delete(id: string): Promise<boolean> {
    const exists = await this.repository.loadById(id);
    const verifySupply = await this.loadSupplyByCarID.loadByCarId(id);
    if (verifySupply.length !== 0)
      throw new Error(
        "Exclua todos os abastecimentos do carro antes de tentar novamente!"
      );
    if (!exists) throw new Error("Não encontrado!");
    await this.repository.delete(id);
    return true;
  }
}
