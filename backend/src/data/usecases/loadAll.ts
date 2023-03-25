import { ILoadAllUsecase } from "../../domain/usecases/loadAll";
import { ILoadAllRepository } from "../protocols/repository/loadAll";

export class LoadAllUsecase<T> implements ILoadAllUsecase<T> {
  constructor(private readonly repository: ILoadAllRepository<T>) {}
  public async load(): Promise<T[] | null> {
    const data = await this.repository.loadAll();
    if (data.length === 0) return null;
    return data;
  }
}
