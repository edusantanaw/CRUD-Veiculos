import { IUser } from "../../../types/user";

export interface ILoadByCpf {
    loadByCpf: (cpf: string) => Promise<IUser | null>;
  }
  