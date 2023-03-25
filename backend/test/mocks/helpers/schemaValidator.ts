import { carParams } from "../../../src/data/protocols/repository/createCar";
import { ISchemaValidator } from "../../../src/presentational/presentational/helpers/validator";

export class SchemaValidatorSpy implements ISchemaValidator<carParams> {
    public valid = true;
    public input: any;
    public isValid(value: carParams) {
      this.input = value;
      if (!this.valid) return { message: "Error" };
      return null;
    }
  }