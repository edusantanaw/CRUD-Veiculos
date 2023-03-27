import { makeCarHelper } from "../../../test/helpers/makeCar";
import { RepositorySpy } from "../../../test/mocks/repository/repositoy";
import { SupplyRepositorySpy } from "../../../test/mocks/repository/supply";
import { ICar } from "../../types/car";
import { ISuplly } from "../../types/supply";
import { DeleteCarUsecase } from "./deleteCar";

function makeSut() {
  const supplyRepository = new SupplyRepositorySpy();
  const carRepository = new RepositorySpy<ICar>();
  const deleteUsecase = new DeleteCarUsecase(supplyRepository, carRepository);
  return { deleteUsecase, carRepository, supplyRepository };
}

describe("DeleteUsecase", () => {
  test("Should call carRepository with correct values", async () => {
    const { deleteUsecase, carRepository } = makeSut();
    carRepository.items = [{ ...makeCarHelper(), id: "any_id" }];
    await deleteUsecase.delete("any_id");
    expect(carRepository.input).toBe("any_id");
  });

  test("Should throw if item no found!", async () => {
    const { deleteUsecase } = makeSut();
    const response = deleteUsecase.delete("any_id");
    expect(response).rejects.toThrow("Não encontrado!");
  });

  test("Should call supplyRepository with correct value", async () => {
    const { deleteUsecase, carRepository, supplyRepository } = makeSut();
    carRepository.items = [{ ...makeCarHelper(), id: "any_id" }];
    await deleteUsecase.delete("any_id");
    expect(supplyRepository.input).toBe("any_id");
  });

  test("Shoul throw if car have supplys!", async () => {
    const { deleteUsecase, carRepository, supplyRepository } = makeSut();
    supplyRepository.items = [{ carId: "any_id" } as ISuplly];
    carRepository.items = [{ ...makeCarHelper(), id: "any_id" }];
    const response =  deleteUsecase.delete("any_id");
    expect(response).rejects.toThrow(
      "Exclua todos os abastecimentos do carro antes de tentar novamente!"
    );
  });

  test("Should delete item and return true", async () => {
    const { deleteUsecase, carRepository } = makeSut();
    carRepository.items = [{ ...makeCarHelper(), id: "any_id" }];
    const response = await deleteUsecase.delete("any_id");
    expect(response).toBe(true);
  });
});
