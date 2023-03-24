import { IUser } from "../../../src/types/user";

export class JwtTokenSpy {
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
