import { randomUUID } from "node:crypto";

type data = {
  id?: string;
  carId: string;
  quantitySupplied: number;
  typeFuel: string;
  price: number;
};

export class Supply {
  private id: string;
  private carId: string;
  private quantitySupplied: number;
  private typeFuel: string;
  private price: number;

  constructor(data: data) {
    this.id = data.id ?? randomUUID();
    this.carId = data.carId;
    this.quantitySupplied = data.quantitySupplied;
    this.typeFuel = data.typeFuel;
    this.price = data.price; //should be calculete with type of fuel price * quantity?
  }

  getSupply() {
    return {
      id: this.id,
      carId: this.carId,
      quantitySupplied: this.quantitySupplied,
      typeFuel: this.typeFuel,
      price: this.price,
    };
  }
}
