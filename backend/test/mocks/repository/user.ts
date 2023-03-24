import { IUser } from "../../../src/types/user";
import { RepositorySpy } from "./repositoy";

export class UserRepositorySpy extends RepositorySpy<IUser> {
  public users: IUser[] = [];
  public cpf: unknown;
  public async loadByCpf(cpf: string) {
    this.cpf = cpf;
    const loadedUser = this.users.filter((user) => user.cpf === cpf);
    return loadedUser[0];
  }
}
