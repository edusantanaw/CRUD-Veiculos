import { ICreateUsecase } from "../../domain/usecases/create";
import { IUser } from "../../types/user";
import {
  badRequest,
  created,
  error,
  httpResponse,
} from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { IValidator } from "../presentational/helpers/validator";

type response = {
  token: string;
  user: IUser;
};

type data = {
  cpf: string;
  password: string;
};

export class CreateUserController implements IController {
  constructor(
    private readonly cpfValidator: IValidator<string>,
    private readonly createUserUsecase: ICreateUsecase<data, response>
  ) {}

  public async handle({ cpf, password }: data): Promise<httpResponse> {
    try {
      if (!cpf) return badRequest("O cpf é necessario!");
      if (!password) return badRequest("A senha é necessaria!");
      if (!this.cpfValidator.isValid(cpf))
        return badRequest("O cpf é invalido!");
      const { token, user } = await this.createUserUsecase.create({
        cpf,
        password,
      });
      return created({ token, user });
    } catch (err) {
      return error(err as Error);
    }
  }
}
