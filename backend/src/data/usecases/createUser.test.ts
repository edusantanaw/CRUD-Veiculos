import { UserRepositorySpy } from "../../../test/mocks/repository/user";
import { IUser } from "../../types/user";

type data = {
  cpf: string;
  password: string;
};

interface ICreateUserRepository {
  create: (data: IUser) => Promise<IUser>;
  loadByCpf: (cpf: string) => Promise<IUser | null>;
}

class CreateUserUsecase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  public async create(data: data) {
    const verifyCpfAlredyUsed = !!(await this.userRepository.loadByCpf(
      data.cpf
    ));
    if (verifyCpfAlredyUsed) throw new Error("Cpf já está sendo usado!");
  }
}

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const createUserUsecase = new CreateUserUsecase(userRepository);
  return { createUserUsecase, userRepository };
}

describe("CreateUserUsecase", () => {
  test("Should throw if cpf is already being used!", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    userRepository.users = [{ id: "any", cpf: "any_cpf", password: "any" }];
    const response = createUserUsecase.create({
      cpf: "any_cpf",
      password: "any_password",
    });
    expect(response).rejects.toThrow("Cpf já está sendo usado!");
  });
});
