import { IValidator } from "../presentational/presentational/helpers/validator";
import { cpf } from "cpf-cnpj-validator";

export class CpfValidator implements IValidator<string> {
  public isValid(value: string): boolean {
    const valid = cpf.isValid(value);
    return valid;
  }
}
