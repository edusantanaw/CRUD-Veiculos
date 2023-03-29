import { makeCarHelper } from "../helpers/makeCar";
import { CarRepositorySpy } from "../mocks/repository/car";
import { RepositorySpy } from "../mocks/repository/repositoy";
import { ISuplly } from "../../src/types/supply";
import { CreateSupplyUsecase } from "../../src/data/usecases/createSupply";

function makeSut() {
  const carRepository = new CarRepositorySpy();
  const supplyRepository = new RepositorySpy<ISuplly>();
  carRepository.items = [{ ...makeCarHelper(), id: "car_id" }];
  const createSupplyUsecase = new CreateSupplyUsecase(
    carRepository,
    supplyRepository
  );
  return { carRepository, supplyRepository, createSupplyUsecase };
}

function makeSupply() {
  return {
    carId: "car_id",
    price: 30,
    quantitySupplied: 10,
    typeFuel: "A",
  };
}

describe("CreateSupplyUsecase", () => {
  test("Should call carRepository with correct value", async () => {
    const { createSupplyUsecase, carRepository } = makeSut();
    await createSupplyUsecase.create(makeSupply());
    expect(carRepository.input).toBe("car_id");
  });

  test("Should throw if car are not found!", async () => {
    const { createSupplyUsecase, carRepository } = makeSut();
    carRepository.items = [];
    const response = createSupplyUsecase.create(makeSupply());
    expect(response).rejects.toThrow("Carro não encontrado!");
  });

  test("Should call create method with correct values", async () => {
    const { createSupplyUsecase, supplyRepository } = makeSut();
    await createSupplyUsecase.create(makeSupply());
    expect(supplyRepository.input).toEqual({
      ...makeSupply(),
      id: "any_id",
    });
  });

  test("Should return a new supply if is created", async () => {
    const { createSupplyUsecase } = makeSut();
    const response = await createSupplyUsecase.create(makeSupply());
    expect(response).toEqual({
      ...makeSupply(),
      id: "any_id",
    });
  });
});
