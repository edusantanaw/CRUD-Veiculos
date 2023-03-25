import { DeleteUsecaseSpy } from "../../../test/mocks/usecases/delete";
import { DeleteController } from "./delete";

function makeSut() {
  const deleteUsecase = new DeleteUsecaseSpy();
  const deleteController = new DeleteController(deleteUsecase);
  return { deleteController, deleteUsecase };
}

describe("DeleteController", () => {
  test("Should return a badRequest if no id is provided", async () => {
    const { deleteController } = makeSut();
    const response = await deleteController.handle({ id: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O id é necessario!");
  });

  test("Should call deleteUsecase with correct value", async () => {
    const { deleteController, deleteUsecase } = makeSut();
    await deleteController.handle({ id: "any_id" });
    expect(deleteUsecase.input).toBe("any_id");
  });

  test("Should return a error if item not found", async () => {
    const { deleteController, deleteUsecase } = makeSut();
    deleteUsecase.itemExists = false;
    const response = await deleteController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Não encontrado!");
  });

  test("Should return a success if item is deleted", async () => {
    const { deleteController } = makeSut();
    const response = await deleteController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true);
  });
});
