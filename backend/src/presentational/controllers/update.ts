import { IUpdateUsecase } from "../../domain/usecases/update";
import {
  badRequest, error,
  httpResponse,
  success
} from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { ISchemaValidator } from "../presentational/helpers/validator";



export class UpdateController<T, P> implements IController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<P>,
    private readonly updateUsecase: IUpdateUsecase<P, T>
  ) {}
  public async handle(data: P): Promise<httpResponse> {
    try {
      const response = this.schemaValidator.isValid(data);
      if (!!response) return badRequest(response.message);
      const updated = await this.updateUsecase.update({ ...data });
      return success(updated);
    } catch (err) {
      return error(err as Error);
    }
  }
}
