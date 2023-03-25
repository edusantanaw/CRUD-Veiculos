import { carParams } from "../../data/protocols/repository/createCar";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICar } from "../../types/car";
import {
  badRequest,
  created,
  error,
  httpResponse,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { ISchemaValidator } from "../presentational/helpers/validator";

export class CreateCarController implements IController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<carParams>,
    private readonly createCarUsecase: ICreateUsecase<carParams, ICar>
  ) {}
  public async handle(data: carParams): Promise<httpResponse> {
    try {
      const response = this.schemaValidator.isValid(data);
      if (!!response) return badRequest(response.message);
      const car = await this.createCarUsecase.create({ ...data });
      return created(car);
    } catch (err) {
      return error(err as Error);
    }
  }
}
