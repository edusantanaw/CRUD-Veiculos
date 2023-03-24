import { IUser } from "../../../types/user";

export interface ICreateUserRepository {
    create: (data: IUser) => Promise<IUser>;
    loadByCpf: (cpf: string) => Promise<IUser | null>;
  }
  