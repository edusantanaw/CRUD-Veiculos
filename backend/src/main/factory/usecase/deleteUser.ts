import { DeleteUsecase } from "../../../data/usecases/delete";
import { UserRepository } from "../../../infra/repository/user";

export function makeDeleteUserUsecase() {
  const userRepository = new UserRepository();
  return new DeleteUsecase(userRepository);
}
