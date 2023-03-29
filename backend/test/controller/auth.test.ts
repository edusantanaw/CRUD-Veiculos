import { CpfValidatorSpy } from "../mocks/helpers/cpfValidator";
import { AuthUsecaseSpy } from "../mocks/usecases/auth";
import { AuthController } from "../../src/presentational/controllers/auth";

function makeSut() {
  const authUsecase = new AuthUsecaseSpy();
  const cpfValidator = new CpfValidatorSpy();
  const authController = new AuthController(cpfValidator, authUsecase);
  return { authController, cpfValidator, authUsecase };
}

describe("AuthController", () => {
  test("Should return a badRequest if cpf is not provided!", async () => {
    const { authController } = makeSut();
    const response = await authController.handle({ cpf: "", password: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O cpf é necessario!");
  });

  test("Should return a badRequest if password is not provided!", async () => {
    const { authController } = makeSut();
    const response = await authController.handle({
      cpf: "any_cpf",
      password: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("A senha é necessaria!");
  });

  test("Should call cpfValidator with correct value", async () => {
    const { authController, cpfValidator } = makeSut();
    await authController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(cpfValidator.input).toBe("any_cpf");
  });

  test("Should return a badRequest if cpf is invalid", async () => {
    const { authController, cpfValidator } = makeSut();
    cpfValidator.valid = false;
    const response = await authController.handle({
      cpf: "invalid_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("O cpf é invalido!");
  });

  test("Should call authUsecase with corret values", async () => {
    const { authController, authUsecase } = makeSut();
    await authController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(authUsecase.input).toEqual({
      cpf: "any_cpf",
      password: "any_password",
    });
  });

  test("Should throw if user not exists!", async () => {
    const { authController, authUsecase } = makeSut();
    authUsecase.userExists = false;
    const response = await authController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Usuario não encontrado!");
  });

  test("Should throw if password is not valid!", async () => {
    const { authController, authUsecase } = makeSut();
    authUsecase.isPasswordValid = false;
    const response = await authController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("A senha é invalida!");
  });

  test("Should return success if everthing is ok", async () => {
    const { authController, authUsecase } = makeSut();
    const response = await authController.handle({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: "token", user: authUsecase.user });
  });
});
