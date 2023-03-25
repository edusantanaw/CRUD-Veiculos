import { IValidator } from "../../../src/presentational/presentational/helpers/validator";

export class CpfValidator implements IValidator<string> {
    public valid = true;
    public input: any;
    public isValid(cpf: string) {
      this.input = cpf;
      return this.valid;
    }
  }