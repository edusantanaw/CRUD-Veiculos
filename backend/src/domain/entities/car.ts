import { randomUUID } from "node:crypto";

type data = {
  id?: string;
  model: string;
  licensePlate: string;
  color: string;
  power: string;
  brand: string;
  renavan: string;
};

export class Car {
  private id: string;
  private model: string;
  private licensePlate: string;
  private color: string;
  private power: string;
  private brand: string;
  private renavan: string;

  constructor(data: data) {
    this.id = data.id ?? randomUUID();
    this.model = data.model;
    this.licensePlate = data.licensePlate;
    this.color = data.color;
    this.power = data.power;
    this.brand = data.brand;
    this.renavan = data.renavan;
  }

  public getCar() {
    return {
      id: this.id,
      model: this.model,
      licensePlate: this.licensePlate,
      color: this.color,
      power: this.power,
      brand: this.brand,
      renavan: this.renavan,
    };
  }
}
