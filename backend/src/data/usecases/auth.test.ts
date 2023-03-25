import { CompareSpy } from "../../../test/mocks/helpers/encrypter";
import { JwtTokenSpy } from "../../../test/mocks/helpers/jwtToken";
import { UserRepositorySpy } from "../../../test/mocks/repository/user";
import { User } from "../../domain/entities/user";
import { AuthUsecase } from "./auth";

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const encrypter = new CompareSpy();
  const jwtToken = new JwtTokenSpy();
  const authUsecase = new AuthUsecase(userRepository, encrypter, jwtToken);
  userRepository.users = [
    new User({
      cpf: "any_cpf",
      password: "any_password",
      id: "any_id",
    }).getUser(),
  ];
  return { authUsecase, userRepository, encrypter, jwtToken };
}

describe("AuthUsecase", () => {
  test("Should throw if user is not found!", () => {
    const { authUsecase, userRepository } = makeSut();
    userRepository.users = [];
    const response = authUsecase.execute({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response).rejects.toThrow("Usuario não encontrado!");
  });

  test("Should call userRepository with correct values", async () => {
    const { authUsecase, userRepository } = makeSut();
    await authUsecase.execute({ cpf: "any_cpf", password: "any_password" });
    expect(userRepository.cpf).toBe("any_cpf");
  });

  test("Should call Encrypter with correct value", async () => {
    const { authUsecase, encrypter } = makeSut();
    await authUsecase.execute({ cpf: "any_cpf", password: "any_password" });
    expect(encrypter.inputs).toEqual({
      pass: "any_password",
      hashed: "any_password",
    });
  });

  test("Should throw if password is not valid", async () => {
    const { authUsecase, encrypter } = makeSut();
    encrypter.isValid = false;
    const response = authUsecase.execute({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response).rejects.toThrow("Senha invalida!");
  });

  test("Should call jwtToken with correct value", async () => {
    const { authUsecase, jwtToken } = makeSut();
    await authUsecase.execute({
      cpf: "any_cpf",
      password: "any_password",
    });

    expect(jwtToken.input).toEqual({
      cpf: "any_cpf",
      password: "any_password",
      id: "any_id",
    });
  });

  test("Should return an user and token", async () => {
    const { authUsecase } = makeSut();
    const response = await authUsecase.execute({
      cpf: "any_cpf",
      password: "any_password",
    });

    expect(response).toEqual({
      token: "token",
      user: {
        cpf: "any_cpf",
        password: "any_password",
        id: "any_id",
      },
    });
  });
});
