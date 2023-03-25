import { ILoadByIdUsecase } from "../../domain/usecases/loadById";
import {
  badRequest,
  httpResponse,
  noContent,
  server,
  success,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";

type data = {
  id: string;
};

export class LoadByIdController<T> implements IController {
  constructor(private readonly loadByIdUsecase: ILoadByIdUsecase<T>) {}
  public async handle({ id }: data): Promise<httpResponse> {
    try {
      if (!id) return badRequest("O id é necessario!");
      const data = await this.loadByIdUsecase.loadById(id);
      if (!data) return noContent("Id");
      return success(data);
    } catch (err) {
      return server(err as Error);
    }
  }
}
