import { UpdateController } from "../../../presentational/controllers/update";
import { updateSupplySchema } from "../../../presentational/schemas/supply";
import { SchemaValiadtor } from "../../../utils/schemaValidator";
import { makeUpdateSuplyUsecase } from "../usecase/updateSuply";

export function makeUpdateSupplyController() {
  const schemaValidator = new SchemaValiadtor(updateSupplySchema);
  return new UpdateController(schemaValidator, makeUpdateSuplyUsecase());
}
