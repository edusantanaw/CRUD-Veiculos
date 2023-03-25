import { randomUUID } from "node:crypto";

type data = {
  id?: string;
  model: string;
  licensePlate: string;
  color: string;
  power: number;
  brand: string;
  renavam: string;
};

export class Car {
  private id: string;
  private model: string;
  private licensePlate: string;
  private color: string;
  private power: number;
  private brand: string;
  private renavam: string;

  constructor(data: data) {
    this.id = data.id ?? randomUUID();
    this.model = data.model;
    this.licensePlate = data.licensePlate;
    this.color = data.color;
    this.power = data.power;
    this.brand = data.brand;
    this.renavam = data.renavam;
  }

  public getCar() {
    return {
      id: this.id,
      model: this.model,
      licensePlate: this.licensePlate,
      color: this.color,
      power: this.power,
      brand: this.brand,
      renavam: this.renavam,
    };
  }
}
