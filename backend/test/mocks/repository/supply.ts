import { ISuplly } from "../../../src/types/supply";
import { RepositorySpy } from "./repositoy";

export class SupplyRepositorySpy extends RepositorySpy<ISuplly> {
  public async loadByCarId(id: string) {
    this.input = id;
    const cars = this.items.filter((item) => item.carId === id);
    return cars;
  }
}
