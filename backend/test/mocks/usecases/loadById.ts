import { ILoadByIdUsecase } from "../../../src/domain/usecases/loadById";

export class LoadByIdUsecaseSpy implements ILoadByIdUsecase<unknown> {
  public item: any = { id: "any_id" };
  public input: any;
  public serverError: boolean = false;
  public async loadById(id: string): Promise<unknown | null> {
    this.input = id;
    if (this.serverError) throw new Error("Internal server error!");
    return this.item;
  }
}
