import { DeleteController } from "../../../presentational/controllers/delete";
import { makeDeleteCarUsecase } from "../usecase/deleteCar";

export function makeDeleteCarController() {
  const deleteCarUsecase = makeDeleteCarUsecase();
  return new DeleteController(deleteCarUsecase);
}
