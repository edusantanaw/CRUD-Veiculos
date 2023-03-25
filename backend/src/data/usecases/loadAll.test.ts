import { RepositorySpy } from "../../../test/mocks/repository/repositoy";
import { LoadAllUsecase } from "./loadAll";

function makeSut() {
  const repository = new RepositorySpy();
  const loadAllUsecase = new LoadAllUsecase(repository);
  return { repository, loadAllUsecase };
}

describe("LoadAllUsecase", () => {
  test("Should return null if no content are found", async () => {
    const { loadAllUsecase } = makeSut();
    const response = await loadAllUsecase.load();
    expect(response).toBe(null);
  });

  test("Should all content if are found", async () => {
    const { loadAllUsecase, repository } = makeSut();
    const items = [{ id: "any_id" }];
    repository.items = items;
    const response = await loadAllUsecase.load();
    expect(response).toEqual(items);
  });
});
