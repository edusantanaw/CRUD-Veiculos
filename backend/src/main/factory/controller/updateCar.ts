import { UpdateCarController } from "../../../presentational/controllers/update";
import { updateCarSchema } from "../../../presentational/schemas/car";
import { SchemaValiadtor } from "../../../utils/schemaValidator";
import { makeUpdateCarUsecase } from "../usecase/updateCar";

export function makeUpdateCarController() {
  const schemaValidator = new SchemaValiadtor(updateCarSchema);
  const updateCarUsecase = makeUpdateCarUsecase();
  return new UpdateCarController(schemaValidator, updateCarUsecase);
}
