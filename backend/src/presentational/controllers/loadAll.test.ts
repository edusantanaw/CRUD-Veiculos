import { LoadAllUsecaseSpy } from "../../../test/mocks/usecases/loadAll";
import { LoadAllController } from "./loadAll";

function makeSut() {
  const loadAllUsecase = new LoadAllUsecaseSpy();
  const loadAllController = new LoadAllController(loadAllUsecase);
  return { loadAllUsecase, loadAllController };
}

describe("LoadAllController", () => {
  test("Should return no content if items are not founds", async () => {
    const { loadAllController } = makeSut();
    const response = await loadAllController.handle();
    expect(response.statusCode).toBe(204);
  });

  test("Should return success if items are founds", async () => {
    const { loadAllController, loadAllUsecase } = makeSut();
    loadAllUsecase.items = ["123"];
    const response = await loadAllController.handle();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(["123"]);
  });

  test("Should return server error if unexpected error happen", async () => {
    const { loadAllController, loadAllUsecase } = makeSut();
    loadAllUsecase.items = ["123"];
    loadAllUsecase.serverError = true;
    const response = await loadAllController.handle();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual("Internal server error!");
  });
});
