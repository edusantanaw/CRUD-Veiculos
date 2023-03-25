import { User } from "../../../src/domain/entities/user";
import { ICreateUsecase } from "../../../src/domain/usecases/create";
import { IUser } from "../../../src/types/user";

type data = {
  cpf: string;
  password: string;
};

export class CreateUserUsecaseSpy
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
