import { RepositorySpy } from "../mocks/repository/repositoy";
import { DeleteUsecase } from "../../src/data/usecases/delete";

function makeSut() {
  const repository = new RepositorySpy();
  const deleteUsecase = new DeleteUsecase(repository);
  return { deleteUsecase, repository };
}

describe("DeleteUsecase", () => {
  test("Should call repository with correct values", async () => {
    const { deleteUsecase, repository } = makeSut();
    repository.items = [{ id: "any_id" }];
    await deleteUsecase.delete("any_id");
    expect(repository.input).toBe("any_id");
  });

  test("Should throw if item no found!", async () => {
    const { deleteUsecase } = makeSut();
    const response = deleteUsecase.delete("any_id");
    expect(response).rejects.toThrow("Não encontrado!");
  });

  test("Should delete item and return true", async () => {
    const { deleteUsecase, repository } = makeSut();
    repository.items = [{ id: "any_id" }];
    const response = await deleteUsecase.delete("any_id");
    expect(response).toBe(true);
  });
});
