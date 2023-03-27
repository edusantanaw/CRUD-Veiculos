import { ICreateUsecase } from "../../domain/usecases/create";
import {
  badRequest,
  created,
  error,
  httpResponse,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { ISchemaValidator } from "../presentational/helpers/validator";

export class CreateCarController<T, P> implements IController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<T>,
    private readonly createUsecase: ICreateUsecase<T, P>
  ) {}
  public async handle(data: T): Promise<httpResponse> {
    try {
      const response = this.schemaValidator.isValid(data);
      if (!!response) return badRequest(response.message);
      const newData = await this.createUsecase.create({ ...data });
      return created(newData);
    } catch (err) {
      return error(err as Error);
    }
  }
}
