import { makeCarHelper } from "../../../test/helpers/makeCar";
import { carParams } from "../../data/protocols/repository/createCar";
import { Car } from "../../domain/entities/car";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICar } from "../../types/car";
import {
  badRequest,
  created,
  error,
  httpResponse,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";

interface ISchemaValidator<T> {
  isValid: (data: T) => { message: string } | null;
}

class SchemaValidatorSpy implements ISchemaValidator<carParams> {
  public valid = true;
  public input: any;
  public isValid(value: carParams) {
    this.input = value;
    if (!this.valid) return { message: "Error" };
    return null;
  }
}

class CreateCarController implements IController {
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

class CreateCarUsecaseSpy implements ICreateUsecase<carParams, ICar> {
  public licensePlateused: boolean = false;
  public input: any;
  public async create(data: carParams): Promise<ICar> {
    this.input = data;
    const car = new Car({...data, id: "any_id"}); // mocking id
    if (this.licensePlateused)
      throw new Error("Está placa já esta cadastrado a outro carro!");
    return car.getCar();
  }
}

function makeSut() {
  const schemaValidator = new SchemaValidatorSpy();
  const createCarUsecase = new CreateCarUsecaseSpy();
  const createCarController = new CreateCarController(
    schemaValidator,
    createCarUsecase
  );
  return { createCarController, schemaValidator, createCarUsecase };
}

describe("CreateCarController", () => {
  test("Should call schemaValidator with correct values", async () => {
    const { createCarController, schemaValidator } = makeSut();
    await createCarController.handle(makeCarHelper());
    expect(schemaValidator.input).toEqual(makeCarHelper());
  });

  test("Should return a badRequest if any field is invalid", async () => {
    const { createCarController, schemaValidator } = makeSut();
    schemaValidator.valid = false;
    const response = await createCarController.handle({} as carParams);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Error");
  });

  test("Should call createCarUsecase with correct values", async () => {
    const { createCarController, createCarUsecase } = makeSut();
    await createCarController.handle(makeCarHelper());
    expect(createCarUsecase.input).toEqual(makeCarHelper());
  });

  test("Should return a error if license plate are already being used", async () => {
    const { createCarController, createCarUsecase } = makeSut();
    createCarUsecase.licensePlateused = true;
    const response = await createCarController.handle(makeCarHelper());
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Está placa já esta cadastrado a outro carro!");
  });
 
  test("Should return created if car are create", async () => {
    const { createCarController} = makeSut();
    const response = await createCarController.handle(makeCarHelper());
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({...makeCarHelper(), id: "any_id"});
  });
});
