import { UserRepositorySpy } from "../../../test/mocks/repository/user";
import { User } from "../../domain/entities/user";
import { IUser } from "../../types/user";

type data = {
  cpf: string;
  password: string;
};

interface ICreateUserRepository {
  create: (data: IUser) => Promise<IUser>;
  loadByCpf: (cpf: string) => Promise<IUser | null>;
}

interface IEncrypter {
  genHash: (password: string) => Promise<string>;
}
interface IJwtToken {
  genToken: (data: IUser) => string;
}

class EncrypterSpy implements IEncrypter {
  public input: any;
  public async genHash(password: string): Promise<string> {
    this.input = password;
    return "hashed_password";
  }
}

class JwtTokenSpy {
  public token?: string;
  public input: any;
  public userId?: string;
  public genToken(data: IUser) {
    this.userId = data.id;
    data.id = "any_id";
    this.input = data;
    this.token = "token";
    return this.token;
  }
}

class CreateUserUsecase {
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly encrypter: IEncrypter,
    private readonly jwtToken: IJwtToken
  ) {}

  public async create(data: data) {
    const verifyCpfAlredyUsed = !!(await this.userRepository.loadByCpf(
      data.cpf
    ));
    if (verifyCpfAlredyUsed) throw new Error("Cpf já está sendo usado!");
    const newUser = new User(data);
    const hasehdPassword = await this.encrypter.genHash(data.password);
    newUser.setPassword(hasehdPassword);
    await this.userRepository.create(newUser.getUser());
    const token = this.jwtToken.genToken(newUser.getUser());
    return { token, user: newUser };
  }
}

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const encrypter = new EncrypterSpy();
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
    userRepository.users = [{ id: "any", cpf: "any_cpf", password: "any" }];
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
