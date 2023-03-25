import { LoadByIdUsecaseSpy } from "../../../test/mocks/usecases/loadById";
import { LoadByIdController } from "./loadById";

function makeSut() {
  const loadByIdUsecase = new LoadByIdUsecaseSpy();
  const loadByIdController = new LoadByIdController(loadByIdUsecase);
  return { loadByIdController, loadByIdUsecase };
}

describe("LoadByIdController", () => {
  test("Should return a badResquet if id is not provided!", async () => {
    const { loadByIdController } = makeSut();
    const response = await loadByIdController.handle({ id: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O id é necessario!");
  });

  test("Should call loadByIdUsecase with correct value!", async () => {
    const { loadByIdController, loadByIdUsecase } = makeSut();
    await loadByIdController.handle({ id: "any_id" });
    expect(loadByIdUsecase.input).toBe("any_id");
  });

  test("Should return no content if no one item is found!", async () => {
    const { loadByIdController, loadByIdUsecase } = makeSut();
    loadByIdUsecase.item = null;
    const response = await loadByIdController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(204);
  });

  test("Should return success if a item is found!!", async () => {
    const { loadByIdController } = makeSut();
    const response = await loadByIdController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: "any_id" });
  });

  test("Should return a server error if an unexpected error happen!", async () => {
    const { loadByIdController, loadByIdUsecase } = makeSut();
    loadByIdUsecase.serverError = true;
    const response = await loadByIdController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe("Internal server error!");
  });
});
