import { IUser } from "../../../src/types/user";
import { RepositorySpy } from "./repositoy";

export class UserRepositorySpy extends RepositorySpy<IUser> {
  public users: IUser[] = [];

  public async loadByCpf(cpf: string) {
    const loadedUser = this.users.filter((user) => user.cpf === cpf);
    return loadedUser[0];
  }
}
