import { CreateController } from "../../../presentational/controllers/create";
import { createSchemaShema } from "../../../presentational/schemas/supply";
import { SchemaValiadtor } from "../../../utils/schemaValidator";
import { makeCreateSupplyUsecase } from "../usecase/createSupplu";

export function makeCreateSupplyController() {
  const schemaValidator = new SchemaValiadtor(createSchemaShema);
  const createSupplyUsecase = makeCreateSupplyUsecase();
  return new CreateController(schemaValidator, createSupplyUsecase);
}
