import { carParams } from "../../data/protocols/repository/createCar";
import { ICreateUsecase } from "../../domain/usecases/create";
import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICar } from "../../types/car";
import {
  badRequest,
  created,
  error,
  httpResponse,
  success,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { ISchemaValidator } from "../presentational/helpers/validator";

export interface updateParams extends carParams {
  id: string;
}

export class UpdateCarController implements IController {
  constructor(
    private readonly schemaValidator: ISchemaValidator<updateParams>,
    private readonly updateCarUsecase: IUpdateUsecase<updateParams, ICar>
  ) {}
  public async handle(data: updateParams): Promise<httpResponse> {
    try {
      const response = this.schemaValidator.isValid(data);
      if (!!response) return badRequest(response.message);
      const car = await this.updateCarUsecase.update({ ...data });
      return success(car);
    } catch (err) {
      return error(err as Error);
    }
  }
}
