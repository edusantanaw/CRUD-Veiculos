import { ILoadByIdUsecase } from "../../domain/usecases/loadById";
import {
  badRequest,
  httpResponse,
  noContent,
  server,
  success,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";

type data = {
  id: string;
};

class LoadByIdController<T> implements IController {
  constructor(private readonly loadByIdUsecase: ILoadByIdUsecase<T>) {}
  public async handle({ id }: data): Promise<httpResponse> {
    try {
      if (!id) return badRequest("O id é necessario!");
      const data = await this.loadByIdUsecase.loadById(id);
      if (!data) return noContent("Id");
      return success(data);
    } catch (err) {
      return server(err as Error);
    }
  }
}

class LoadByIdUsecaseSpy implements ILoadByIdUsecase<unknown> {
  public item: any = { id: "any_id" };
  public input: any;
  public serverError: boolean = false;
  public async loadById(id: string): Promise<unknown | null> {
    this.input = id;
    if (this.serverError) throw new Error("Internal server error!");
    return this.item;
  }
}

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
    expect(response.body).toEqual({id: "any_id"})
  });

  test("Should return a server error if an unexpected error happen!", async () => {
    const { loadByIdController, loadByIdUsecase } = makeSut();
    loadByIdUsecase.serverError = true;
    const response = await loadByIdController.handle({ id: "any_id" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe("Internal server error!");
  });
});
