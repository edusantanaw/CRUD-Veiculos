import { authData, IAuthUsecase } from "../../domain/usecases/auth";
import { badRequest, error, success } from "../helpers/http-response";
import { IController } from "../presentational/controller";
import { IValidator } from "../presentational/helpers/validator";

export class AuthController implements IController {
    constructor(
      private readonly cpfValidator: IValidator<string>,
      private readonly authUsecase: IAuthUsecase
    ) {}
  
    public async handle({ cpf, password }: authData) {
      try {
        if (!cpf) return badRequest("O cpf é necessario!");
        if (!password) return badRequest("A senha é necessaria!");
        if (!this.cpfValidator.isValid(cpf))
          return badRequest("O cpf é invalido!");
        const { token, user } = await this.authUsecase.execute({ cpf, password });
        return success({ token, user });
      } catch (err) {
        return error(err as Error);
      }
    }
  }