import { IJwtToken } from "../data/protocols/helpers/jwtToken";
import { IUser } from "../types/user";
import jwt from "jsonwebtoken";

export class JwtToken implements IJwtToken {
  private secret: string = "JWT_SECRET";
  public genToken(data: IUser): string {
    const token = jwt.sign(data, this.secret);
    return token;
  }
}
