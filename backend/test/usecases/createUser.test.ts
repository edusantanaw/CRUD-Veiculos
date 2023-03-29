import { Encoder } from "../mocks/helpers/encrypter";
import { JwtTokenSpy } from "../mocks/helpers/jwtToken";
import { UserRepositorySpy } from "../mocks/repository/user";
import { CreateUserUsecase } from "../../src/data/usecases/createUser";

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const encrypter = new Encoder();
  const jwtToken = new JwtTokenSpy();
  const createUserUsecase = new CreateUserUsecase(
    userRepository,
    encrypter,
    jwtToken
  );
  return { createUserUsecase, userRepository, encrypter, jwtToken };
}

describe("CreateUserUsecase", () => {
  test("Should throw if cpf is already being used!", () => {
    const { createUserUsecase, userRepository } = makeSut();
    userRepository.items = [{ id: "any", cpf: "any_cpf", password: "any" }];
    const response = createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response).rejects.toThrow("Cpf já está sendo usado!");
  });

  test("Should call loadByCpf with correct values", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    await createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(userRepository.cpf).toBe("any_cpf");
  });

  test("Should call Encrypter with correct values", async () => {
    const { createUserUsecase, userRepository, encrypter } = makeSut();
    await createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(encrypter.input).toBe("any_password");
  });

  test("Should call Encrypter with correct values", async () => {
    const { createUserUsecase, encrypter } = makeSut();
    await createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(encrypter.input).toBe("any_password");
  });

  test("Should call JwtToken with correct values", async () => {
    const { createUserUsecase, jwtToken } = makeSut();
    await createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(jwtToken.input).toEqual({
      cpf: "any_cpf",
      password: "hashed_password",
      id: "any_id",
    });
  });

  test("Should return a new user and token", async () => {
    const { createUserUsecase, jwtToken } = makeSut();
    const response = await createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response).toEqual({
      user: {
        cpf: "any_cpf",
        password: "hashed_password",
        id: jwtToken.userId,
      },
      token: "token",
    });
  });
});
