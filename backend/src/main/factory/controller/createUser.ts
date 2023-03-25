import { CreateUserController } from "../../../presentational/controllers/createUser";
import { CpfValidator } from "../../../utils/cpf-validator";
import { makeCreateUserUsecase } from "../usecase/createUser";

export function makeCreateUserController() {
  const cpfValidator = new CpfValidator();
  const createUserUsecase = makeCreateUserUsecase();
  return new CreateUserController(cpfValidator, createUserUsecase);
}
