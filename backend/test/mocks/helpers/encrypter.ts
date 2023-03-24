import { IEncrypter } from "../../../src/data/protocols/helpers/encrypter";

export class EncrypterSpy implements IEncrypter {
  public input: any;
  public async genHash(password: string): Promise<string> {
    this.input = password;
    return "hashed_password";
  }
}
