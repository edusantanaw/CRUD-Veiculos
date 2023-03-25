import { CreateUserUsecase } from "../../../data/usecases/createUser";
import { Encrypter } from "../../../utils/encrypter";
import { JwtToken } from "../../../utils/jwtToken";
import { UserRepository } from "../../../infra/repository/user";

export function makeCreateUserUsecase() {
  const userRepository = new UserRepository();
  const encrypter = new Encrypter();
  const jwtToken = new JwtToken();
  return new CreateUserUsecase(userRepository, encrypter, jwtToken);
}
