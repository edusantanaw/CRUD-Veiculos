import { makeCarHelper } from "../../../test/helpers/makeCar";
import { SchemaValidatorSpy } from "../../../test/mocks/helpers/schemaValidator";
import { UpdateCarUsecaseSpy } from "../../../test/mocks/usecases/updateCar";
import { UpdateCarController, updateParams } from "./update";

function makeSut() {
  const schemaValidator = new SchemaValidatorSpy();
  const updateCarUsecase = new UpdateCarUsecaseSpy();
  const udaptedCarControlelr = new UpdateCarController(
    schemaValidator,
    updateCarUsecase
  );
  return { udaptedCarControlelr, schemaValidator, updateCarUsecase };
}

describe("CreateCarController", () => {
  test("Should call schemaValidator with correct values", async () => {
    const { udaptedCarControlelr, schemaValidator } = makeSut();
    await udaptedCarControlelr.handle({ ...makeCarHelper(), id: "any_id" });
    expect(schemaValidator.input).toEqual({ ...makeCarHelper(), id: "any_id" });
  });

  test("Should return a badRequest if any field is invalid", async () => {
    const { udaptedCarControlelr, schemaValidator } = makeSut();
    schemaValidator.valid = false;
    const response = await udaptedCarControlelr.handle({} as updateParams);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Error");
  });

  test("Should call updateCar with correct values", async () => {
    const { udaptedCarControlelr, updateCarUsecase } = makeSut();
    await udaptedCarControlelr.handle({ ...makeCarHelper(), id: "any_id" });
    expect(updateCarUsecase.input).toEqual({
      ...makeCarHelper(),
      id: "any_id",
    });
  });

  test("Should return a error if license plate are already being used", async () => {
    const { udaptedCarControlelr, updateCarUsecase } = makeSut();
    updateCarUsecase.licensePlateused = true;
    const response = await udaptedCarControlelr.handle({
      ...makeCarHelper(),
      id: "any_id",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Está placa já esta cadastrado a outro carro!");
  });

  test("Should return success if car are updated", async () => {
    const { udaptedCarControlelr } = makeSut();
    const response = await udaptedCarControlelr.handle({
      ...makeCarHelper(),
      id: "any_id",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ...makeCarHelper(), id: "any_id" });
  });
});
