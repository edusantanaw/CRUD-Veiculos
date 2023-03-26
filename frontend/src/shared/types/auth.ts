import { IUser } from "./user";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  auth: boolean;
  error: unknown | null;
  signin: (data: data) => Promise<void>;
  signup: (data: data) => Promise<void>;
}

export type data = {
  cpf: string;
  password: string;
};
