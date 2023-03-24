import { IUser } from "../../../types/user";

export interface IJwtToken {
    genToken: (data: IUser) => string;
  }
  