import { makeCarHelper } from "../helpers/makeCar";
import { CarRepositorySpy } from "../mocks/repository/car";
import { Car } from "../../src/domain/entities/car";
import { CreateCarUsecase } from "../../src/data/usecases/createCar";

function makeSut() {
  const carRepository = new CarRepositorySpy();
  const createCarUsecase = new CreateCarUsecase(carRepository);
  return { createCarUsecase, carRepository };
}

describe("CreateCarUsecase", () => {
  test("Should throw if an car with the same licensePlate exists", () => {
    const { createCarUsecase, carRepository } = makeSut();
    carRepository.items = [new Car(makeCarHelper()).getCar()];
    const response = createCarUsecase.create(makeCarHelper());
    expect(response).rejects.toThrow(
      "Está placa já esta cadastrado a outro carro!"
    );
  });

  test("Should call carRepository.findCarByPlate with correct value", async () => {
    const { createCarUsecase, carRepository } = makeSut();
    await createCarUsecase.create(makeCarHelper());
    expect(carRepository.licensePlate).toBe("any_plate");
  });

  test("Should call carRepository.create with correct values", async () => {
    const { createCarUsecase, carRepository } = makeSut();
    await createCarUsecase.create(makeCarHelper());
    expect(carRepository.input).toEqual({ ...makeCarHelper(), id: "any_id" });
  });

  test("Should return a new Car", async () => {
    const { createCarUsecase } = makeSut();
    const response = await createCarUsecase.create(makeCarHelper());
    expect(response).toEqual({ ...makeCarHelper(), id: "any_id" });
  });
});
