import { IComparePass, IEncoder } from "../../../src/data/protocols/helpers/encrypter";

export class Encoder implements IEncoder {
  public input: any;
  public async genHash(password: string): Promise<string> {
    this.input = password;
    return "hashed_password";
  }
}

type compareData = {
  pass: string
  hashed: string
}

export class CompareSpy implements IComparePass {
  public isValid = true;
  public inputs?: compareData;
  public async compare(pass: string, hashed: string): Promise<boolean>{
    this.inputs = {pass, hashed};
    return this.isValid;
  };

}