import { ICar } from "../../../src/types/car";
import { RepositorySpy } from "./repositoy";

export class CarRepositorySpy extends RepositorySpy<ICar> {
  public licensePlate: unknown; // for call tests
  public async findCarByLicensePlate(licensePlate: string) {
    this.licensePlate = licensePlate;
    const car = this.items.filter((item) => (item.licensePlate = licensePlate));
    if (car.length === 0) return null;
    return car[0];
  }
}
