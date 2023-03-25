import { makeCarHelper } from "../../../test/helpers/makeCar";
import { SchemaValidatorSpy } from "../../../test/mocks/helpers/schemaValidator";
import { CreateCarUsecaseSpy } from "../../../test/mocks/usecases/createCar";
import { carParams } from "../../data/protocols/repository/createCar";
import { CreateCarController } from "./createCar";

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
    const { createCarController } = makeSut();
    const response = await createCarController.handle(makeCarHelper());
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ ...makeCarHelper(), id: "any_id" });
  });
});
