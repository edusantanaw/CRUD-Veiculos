import { AuthUsecase } from "../../../data/usecases/auth";
import { Encrypter } from "../../../utils/encrypter";
import { JwtToken } from "../../../utils/jwtToken";
import { UserRepository } from "../../../infra/repository/user";

export function makeAuthUsecase() {
  const userRepository = new UserRepository();
  const encrypter = new Encrypter();
  const jwtToken = new JwtToken();
  return new AuthUsecase(userRepository, encrypter, jwtToken);
}
