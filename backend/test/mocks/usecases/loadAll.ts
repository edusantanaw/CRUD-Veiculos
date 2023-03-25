import { ILoadAllUsecase } from "../../../src/domain/usecases/loadAll";

export class LoadAllUsecaseSpy implements ILoadAllUsecase<unknown> {
    public items: unknown[] = [];
    public serverError: boolean = false;
    public async load(): Promise<unknown[] | null> {
      if (this.items.length === 0) return null;
      if (this.serverError) throw new Error("Internal server error!");
      return this.items;
    }
  }