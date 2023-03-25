import bcrypt from "bcrypt";
import { IComparePass, IEncoder } from "../data/protocols/helpers/encrypter";

export class Encrypter implements IEncoder, IComparePass {
  private rounds: number = 10;
  public async compare(pass: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(pass, hashed);
    return isValid;
  }

  public async genHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
