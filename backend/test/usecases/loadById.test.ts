import { RepositorySpy } from "../mocks/repository/repositoy";
import { LoadByIdUsecase } from "../../src/data/usecases/loadById";

function makeSut() {
  const repository = new RepositorySpy();
  const loadByIdUsecase = new LoadByIdUsecase(repository);
  return { loadByIdUsecase, repository };
}

describe("LoadByIdUsecase", () => {
  test("Should call repository with correct value", async () => {
    const { loadByIdUsecase, repository } = makeSut();
    await loadByIdUsecase.loadById("any_id");
    expect(repository.input).toBe("any_id");
  });

  test("Should return null if no content", async () => {
    const { loadByIdUsecase } = makeSut();
    const response = await loadByIdUsecase.loadById("any_id");
    expect(response).toBe(null);
  });

  test("Should return all data if itens is found", async () => {
    const { loadByIdUsecase, repository } = makeSut();
    repository.items = [{ id: "any_id" }];
    const response = await loadByIdUsecase.loadById("any_id");
    expect(response).toEqual({ id: "any_id" });
  });
});
