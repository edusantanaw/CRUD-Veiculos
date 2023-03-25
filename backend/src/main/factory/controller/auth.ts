import { AuthController } from "../../../presentational/controllers/auth";
import { CpfValidator } from "../../../utils/cpf-validator";
import { makeAuthUsecase } from "../usecase/auth";

export function makeAuthController() {
  const cpfValidator = new CpfValidator();
  const authUsecase = makeAuthUsecase();
  return new AuthController(cpfValidator, authUsecase);
}
