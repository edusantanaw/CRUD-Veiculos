import { randomUUID } from "node:crypto";

type data = {
  cpf: string;
  password: string;
  id?: string;
};

export class User {
  private cpf: string;
  private password: string;
  private id: string;

  constructor({ cpf, password, id }: data) {
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
