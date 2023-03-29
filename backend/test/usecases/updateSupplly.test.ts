import { SupplyRepositorySpy } from "../mocks/repository/supply";
import { ISuplly } from "../../src/types/supply";
import { UpdateSupplyUsecase } from "../../src/data/usecases/updateSupply";

function makeSut() {
  const supplyRepository = new SupplyRepositorySpy();
  const updateSupplyUsecase = new UpdateSupplyUsecase(supplyRepository);
  supplyRepository.items = [makeValidSupply()];
  return { supplyRepository, updateSupplyUsecase };
}

function makeValidSupply(): ISuplly {
  return {
    id: "any_id",
    carId: "any_car_id",
    price: 100,
    quantitySupplied: 10,
    typeFuel: "A",
  };
}

describe("Update supply", () => {
  test("Should call loadById with correct values", async () => {
    const { supplyRepository, updateSupplyUsecase } = makeSut();
    await updateSupplyUsecase.update(makeValidSupply());
    expect(supplyRepository.input).toBe("any_id");
  });

  test("Should throw if suply is not found!", async () => {
    const { supplyRepository, updateSupplyUsecase } = makeSut();
    supplyRepository.items = [];
    const response = updateSupplyUsecase.update(makeValidSupply());
    expect(response).rejects.toThrow("Abastecimento não encontrado!");
  });

  test("Should call update with correct values", async () => {
    const { supplyRepository, updateSupplyUsecase } = makeSut();
    supplyRepository.updateContent = makeValidSupply();
    await updateSupplyUsecase.update(makeValidSupply());
    expect(supplyRepository.updateContent).toEqual(makeValidSupply());
  });

  test("Should return an udated supply", async () => {
    const { supplyRepository, updateSupplyUsecase } = makeSut();
    supplyRepository.updateContent = makeValidSupply();
    const response = await updateSupplyUsecase.update(makeValidSupply());
    expect(response).toEqual(makeValidSupply());
  });
});
