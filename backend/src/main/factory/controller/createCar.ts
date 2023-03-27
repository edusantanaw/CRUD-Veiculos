import { carParams } from "../../../data/protocols/repository/createCar";
import { CreateController } from "../../../presentational/controllers/create";
import { createCarShema } from "../../../presentational/schemas/car";
import { SchemaValiadtor } from "../../../utils/schemaValidator";
import { makeCreateCarUsecase } from "../usecase/createCar";

export function makeCreateCarController() {
  const schemaValidator = new SchemaValiadtor<carParams>(createCarShema);
  const createCarUsecase = makeCreateCarUsecase();
  return new CreateController(schemaValidator, createCarUsecase);
}
