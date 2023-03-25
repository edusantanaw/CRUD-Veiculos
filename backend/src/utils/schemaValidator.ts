import { ZodObject } from "zod";
import { ISchemaValidator } from "../presentational/presentational/helpers/validator";

export class SchemaValiadtor<T> implements ISchemaValidator<T> {
  private schema: ZodObject<any>;
  constructor(schema: ZodObject<any>) {
    this.schema = schema;
  }

  public isValid<T>(data: T) {
    const isSchemaValid = this.schema.safeParse(data);
    if (isSchemaValid.success) {
      return null;
    }
    return isSchemaValid.error.errors[0];
  }
}
