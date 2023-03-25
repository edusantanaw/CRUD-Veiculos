import { IDeleteUsecase } from "../../domain/usecases/delete";
import { IDeleteRepository } from "../protocols/repository/delete";

export class DeleteUsecase<T> implements IDeleteUsecase {
  constructor(private readonly repository: IDeleteRepository<T>) {}

  public async delete(id: string): Promise<boolean> {
    const exists = await this.repository.loadById(id);
    if (!exists) throw new Error("Não encontrado!");
    await this.repository.delete(id);
    return true;
  }
}
