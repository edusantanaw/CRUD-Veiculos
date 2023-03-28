import { IUser } from "./user";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  auth: boolean;
  error: string | null;
  handleAuth: (data: authData, url: string) => Promise<void>;
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
