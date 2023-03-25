import { DeleteController } from "../../../presentational/controllers/delete";
import { makeDeleteUserUsecase } from "../usecase/deleteUser";

export function makeDeleteUserController() {
  return new DeleteController(makeDeleteUserUsecase());
}
