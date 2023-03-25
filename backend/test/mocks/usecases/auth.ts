import { User } from "../../../src/domain/entities/user";
import { authData, authResponse, IAuthUsecase } from "../../../src/domain/usecases/auth";
import { IUser } from "../../../src/types/user";

export class AuthUsecaseSpy implements IAuthUsecase {
    public userExists = true;
    public isPasswordValid = true;
    public user: IUser | null = new User({
      id: "any_id",
      password: "any_password",
      cpf: "any_cpf",
    }).getUser();
    public input: any;
    public async execute(data: authData): Promise<authResponse> {
      this.input = data;
      if (!this.userExists) throw new Error("Usuario não encontrado!");
      if (!this.isPasswordValid) throw new Error("A senha é invalida!");
      return { token: "token", user: this.user! };
    }
  }