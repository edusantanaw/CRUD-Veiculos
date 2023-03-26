import { IUser } from "../../types/user";
import { user } from "../prisma";

export class UserRepository {
  public async create(data: IUser) {
    const newUser = await user.create({
      data: data,
      select: {
        password: false,
        id: true,
        cpf: true,
      },
    });
    return newUser as IUser;
  }

  public async loadById(id: string) {
    const maybeUser = await user.findFirst({ where: { id } });
    return maybeUser as IUser;
  }

  public async loadByCpf(cpf: string) {
    const maybeUser = await user.findFirst({ where: { cpf } });
    return maybeUser as IUser;
  }

  public async delete(id: string) {
    await user.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }
}
