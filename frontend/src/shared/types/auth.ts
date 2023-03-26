import { IUser } from "./user";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  auth: boolean;
  error: string | null;
  signin: (data: authData) => Promise<void>;
  signup: (data: authData) => Promise<void>;
  clearError: () => void;
}

export type authData = {
  cpf: string;
  password: string;
  remember: boolean;
};

export type data = {
  cpf: string;
  password: string;
};
