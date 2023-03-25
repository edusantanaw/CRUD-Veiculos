import { CarRepositorySpy } from "../../../test/mocks/repository/car";
import { Car } from "../../domain/entities/car";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICar } from "../../types/car";

type carParams = {
  model: string;
  licensePlate: string;
  color: string;
  power: string;
  brand: string;
  renavan: string;
};

interface ICreateCarRepository {
  findCarByLicensePlate: (licensePlate: string) => Promise<ICar | null>;
  create: (data: ICar) => Promise<ICar>;
}

class CreateCarUsecase implements ICreateUsecase<carParams, ICar> {
  constructor(private readonly carRepository: ICreateCarRepository) {}

  public async create(data: carParams): Promise<ICar> {
    const licensePlateIsUsed =
      !!(await this.carRepository.findCarByLicensePlate(data.licensePlate));
    if (licensePlateIsUsed)
      throw new Error("Está placa já esta cadastrado a outro carro!");
    const newCar = new Car(data);
    const createdCar = await this.carRepository.create(newCar.getCar());
    return createdCar;
  }
}

function makeCarHelper() {
  return {
    model: "any_model",
    licensePlate: "any_plate",
    color: "any_car",
    power: "any_power",
    brand: "any_brand",
    renavan: "any_renavan",
  };
}

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
    const { createCarUsecase} = makeSut();
    const response =await createCarUsecase.create(makeCarHelper());
    expect(response).toEqual({ ...makeCarHelper(), id: "any_id" });
  });
});
