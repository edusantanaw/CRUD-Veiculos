import { IUser } from "../../../src/types/user";
import { RepositorySpy } from "./repositoy";

export class UserRepositorySpy extends RepositorySpy<IUser> {
  public cpf: unknown; //for call tests
  public async loadByCpf(cpf: string) {
    this.cpf = cpf;
    const loadedUser = this.items.filter((user) => user.cpf === cpf);
    return loadedUser[0];
  }
}
