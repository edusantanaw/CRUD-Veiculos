import { Car } from "../../domain/entities/car";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICar } from "../../types/car";
import {
  carParams,
  ICreateCarRepository,
} from "../protocols/repository/createCar";

export class CreateCarUsecase implements ICreateUsecase<carParams, ICar> {
  constructor(private readonly carRepository: ICreateCarRepository) {}

  public async create(data: carParams): Promise<ICar> {
    const licensePlateIsUsed =
      !!(await this.carRepository.loadByLicensePlate(data.licensePlate));
    if (licensePlateIsUsed)
      throw new Error("Está placa já esta cadastrado a outro carro!");
    const newCar = new Car(data);
    const createdCar = await this.carRepository.create(newCar.getCar());
    return createdCar;
  }
}
