import { randomUUID } from "node:crypto";

export class User {
  private cpf: string;
  private password: string;
  private id: string;

  constructor(cpf: string, password: string, id?: string) {
    this.cpf = cpf;
    this.password = password;
    this.id = id ?? randomUUID();
  }

  public getUser() {
    return {
      id: this.id,
      cpf: this.cpf,
      password: this.password,
    };
  }

  public getCpf() {
    return this.cpf;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getId() {
    return this.id;
  }
}
