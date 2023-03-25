import { makeCarHelper } from "../../../test/helpers/makeCar";
import { CarRepositorySpy } from "../../../test/mocks/repository/car";
import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICar } from "../../types/car";

interface IUpdateCarRepository {
  loadById: (id: string) => Promise<ICar | null>;
  loadByLicensePlate: (licensePlate: string) => Promise<ICar | null>;
  update: (data: ICar) => Promise<ICar>;
}

class UpdateCarUsecase implements IUpdateUsecase<ICar, ICar> {
  constructor(private readonly carRepository: IUpdateCarRepository) {}

  public async update(data: ICar): Promise<ICar> {
    const car = await this.carRepository.loadById(data.id);
    if (!car) throw new Error("Carro não encontrado!");
    if (data.licensePlate !== car.licensePlate) {
      const verifyIfLicensePlaceAlreadyUser =
        !!(await this.carRepository.loadByLicensePlate(data.licensePlate));
      if (verifyIfLicensePlaceAlreadyUser)
        throw new Error("Está placa ja está cadastrado com outro carro!");
    }
    const updatedCar = await this.carRepository.update(data);
    return updatedCar;
  }
}

function makeSut() {
  const repository = new CarRepositorySpy();
  const updateCarUsecase = new UpdateCarUsecase(repository);

  return { repository, updateCarUsecase };
}

describe("UpdateCarUsecase", () => {
  test("Should throw if car are not found", async () => {
    const { updateCarUsecase } = makeSut();
    const response = updateCarUsecase.update({
      ...makeCarHelper(),
      id: "any_id",
    });
    expect(response).rejects.toThrow("Carro não encontrado!");
  });

  test("Should call repository.loadById with correct value", async () => {
    const { updateCarUsecase, repository } = makeSut();
    const car = { ...makeCarHelper(), id: "any_id" };
    repository.input = "any_id";
    repository.items = [car];
    await updateCarUsecase.update(car);
    expect(repository.input).toBe("any_id");
  });

  test("Should call repository.loadLicensePlace with correct value", async () => {
    const { updateCarUsecase, repository } = makeSut();
    const { licensePlate, ...rest } = makeCarHelper();
    const car = { ...rest, id: "any_id", licensePlate: "outher_license" };
    repository.items = [{ ...rest, id: "any_id", licensePlate }];
    await updateCarUsecase.update(car);
    expect(repository.licensePlate).toBe(car.licensePlate);
  });

  test("Should call repository.update with correct values", async () => {
    const { updateCarUsecase, repository } = makeSut();
    const car = { ...makeCarHelper(), id: "any_id" };
    repository.items = [car];
    repository.input = [car];
    await updateCarUsecase.update(car);
    expect(repository.updateContent).toEqual(car);
  });
 
  test("Should return an updated car if car is updated", async () => {
    const { updateCarUsecase, repository } = makeSut();
    const car = { ...makeCarHelper(), id: "any_id" };
    repository.items = [car];
    repository.input = [car];
    const response = await updateCarUsecase.update(car);
    expect(response).toEqual(car);
  });
});
