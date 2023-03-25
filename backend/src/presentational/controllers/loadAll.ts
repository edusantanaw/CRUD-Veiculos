import { ILoadAllUsecase } from "../../domain/usecases/loadAll";
import { httpResponse, noContent, server, success } from "../helpers/http-response";
import { IController } from "../presentational/controller";

export class LoadAllController<T> implements IController {
    constructor(private readonly loadAllUsecase: ILoadAllUsecase<T>) {}
    public async handle(): Promise<httpResponse> {
      try {
        const data = await this.loadAllUsecase.load();
        if (!data) return noContent("Data");
        return success(data);
      } catch (error) {
        return server(error as Error);
      }
    }
  }