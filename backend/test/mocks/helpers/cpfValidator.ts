import { IValidator } from "../../../src/presentational/presentational/helpers/validator";

export class CpfValidatorSpy implements IValidator<string> {
    public valid = true;
    public input: any;
    public isValid(cpf: string) {
      this.input = cpf;
      return this.valid;
    }
  }