import { LoadByIdUsecase } from "../../../data/usecases/loadById";
import { UserRepository } from "../../../infra/repository/user";

export function makeLoadUserByIdUsecase() {
  const repository = new UserRepository();
  return new LoadByIdUsecase(repository);
}
