import { User } from "../../domain/entities/user";
import { ICreateUsecase } from "../../domain/usecases/createUser";
import { IUser } from "../../types/user";

type httpResponse = {
  statusCode: number;
  body: any;
};

interface IController {
  handle: (data: any) => Promise<httpResponse>;
}

type data = {
  cpf: string;
  password: string;
};

function badRequest<T>(data: T): httpResponse {
  return {
    statusCode: 400,
    body: data,
  };
}
function created<T>(data: T): httpResponse {
  return {
    statusCode: 201,
    body: data,
  };
}

function error(data: Error): httpResponse {
  return {
    statusCode: 400,
    body: data.message,
  };
}

class CreateUserUsecaseSpy
  implements ICreateUsecase<data, { token: string; user: IUser }>
{
  private token: string = "token";
  public cpfIsUsed: boolean = false;
  public user: any;
  public input: any;
  public async create(data: data) {
    this.input = data;
    const newUser = new User(data);
    this.user = newUser.getUser();
    if (this.cpfIsUsed) throw new Error("O cpf já está sendo usado!");
    return { token: this.token, user: newUser.getUser() };
  }
}

class CreateUserController implements IController {
  constructor(
    private readonly cpfValidator: IValidator<string>,
    private readonly createUserUsecase: ICreateUsecase<
      data,
      { token: string; user: IUser }
    >
  ) {}

  public async handle({ cpf, password }: data): Promise<httpResponse> {
    try {
      if (!cpf) return badRequest("O cpf é necessario!");
      if (!password) return badRequest("A senha é necessaria!");
      if (!this.cpfValidator.isValid(cpf))
        return badRequest("O cpf é invalido!");
      const { token, user } = await this.createUserUsecase.create({
        cpf,
        password,
      });
      return created({ token, user });
    } catch (err) {
      return error(err as Error);
    }
  }
}

interface IValidator<T> {
  isValid: (value: T) => boolean;
}

class CpfValidator implements IValidator<string> {
  public valid = true;
  public input: any;
  public isValid(cpf: string) {
    this.input = cpf;
    return this.valid;
  }
}

function makeSut() {
  const cpfValidator = new CpfValidator();
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
