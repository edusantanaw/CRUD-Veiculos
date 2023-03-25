import { User } from "../../domain/entities/user";
import { ICreateUsecase } from "../../domain/usecases/create";
import { IUser } from "../../types/user";
import { IEncoder } from "../protocols/helpers/encrypter";
import { IJwtToken } from "../protocols/helpers/jwtToken";
import { ICreateUserRepository } from "../protocols/repository/createUser";

type data = {
  cpf: string;
  password: string;
};

export class CreateUserUsecase
  implements ICreateUsecase<data, { token: string; user: IUser }>
{
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly encrypter: IEncoder,
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
    return { token, user: newUser.getUser() };
  }
}
