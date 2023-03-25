import { CpfValidatorSpy } from "../../../test/mocks/helpers/cpfValidator";
import { CreateUserUsecaseSpy } from "../../../test/mocks/usecases/createUser";
import { CreateUserController } from "./createUser";

function makeSut() {
  const cpfValidator = new CpfValidatorSpy();
  const createUserUsecase = new CreateUserUsecaseSpy();
  const createUserController = new CreateUserController(
    cpfValidator,
    createUserUsecase
  );
  return { createUserController, cpfValidator, createUserUsecase };
}

describe("Create user controller", () => {
  test("Should return statusCode 400 if cpf is not provided!", async () => {
    const { createUserController } = makeSut();
    const response = await createUserController.handle({
      cpf: "",
      password: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O cpf é necessario!");
  });

  test("Should return statusCode 400 if password is not provided!", async () => {
    const { createUserController } = makeSut();
    const response = await createUserController.handle({
      cpf: "any_cpf",
      password: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("A senha é necessaria!");
  });

  test("Should call cpfValidator with correct value", async () => {
    const { createUserController, cpfValidator } = makeSut();
    await createUserController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(cpfValidator.input).toBe("any_cpf");
  });

  test("Should return statusCode 400 if a invalid cpf is provided!", async () => {
    const { createUserController, cpfValidator } = makeSut();
    cpfValidator.valid = false;
    const response = await createUserController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O cpf é invalido!");
  });

  test("Should return status 400 if cpf provided is already being used!", async () => {
    const { createUserController, createUserUsecase } = makeSut();
    createUserUsecase.cpfIsUsed = true;
    const response = await createUserController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O cpf já está sendo usado!");
  });

  test("Should call createUserUsecase with correct values!", async () => {
    const { createUserController, createUserUsecase } = makeSut();
    await createUserController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(createUserUsecase.input).toEqual({
      cpf: "any_cpf",
      password: "any_password",
    });
  });

  test("Should return statusCode 201 and an user and token", async () => {
    const { createUserController, createUserUsecase } = makeSut();
    const response = await createUserController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      token: "token",
      user: createUserUsecase.user,
    });
  });
});
