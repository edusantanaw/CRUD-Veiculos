import { ICar } from "../../types/car";
import { car } from "../prisma";

export class CarRepository {
  public async create(data: ICar) {
    const newCar = await car.create({ data: data });
    return newCar as ICar;
  }

  public async loadById(id: string) {
    const maybeCar = await car.findFirst({ where: { id } });
    return maybeCar as ICar;
  }

  public async loadByLicensePlate(licensePlate: string) {
    const maybeCar = await car.findFirst({ where: { licensePlate } });
    return maybeCar as ICar;
  }

  public async loadAll() {
    const cars = await car.findMany();
    return cars as ICar[];
  }

  public async delete(id: string) {
    await car.update({ where: { id }, data: { deleted: true } });
  }
}
