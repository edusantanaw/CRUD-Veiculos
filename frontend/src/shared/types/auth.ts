import { IUser } from "./user";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  error: string | null;
  handleAuth: (data: authData, url: string) => Promise<void>;
  clearError: () => void;
  logout: () => void;
  isLoading: boolean
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
