import { IUser } from "../../types/user";

export type authData = {
  password: string;
  cpf: string;
};

export type authResponse = {
  token: string;
  user: IUser;
};

export interface IAuthUsecase {
  execute: (data: authData) => Promise<authResponse>;
}
