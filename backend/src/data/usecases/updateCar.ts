import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICar } from "../../types/car";
import { IUpdateCarRepository } from "../protocols/repository/updateCar";

export class UpdateCarUsecase implements IUpdateUsecase<ICar, ICar> {
  constructor(private readonly carRepository: IUpdateCarRepository) {}

  public async update(data: ICar): Promise<ICar> {
    const car = await this.carRepository.loadById(data.id);
    if (!car) throw new Error("Carro não encontrado!");
    if (data.licensePlate !== car.licensePlate) {
      const verifyIfLicensePlaceAlreadyUser =
        !!(await this.carRepository.loadByLicensePlate(data.licensePlate));
      if (verifyIfLicensePlaceAlreadyUser)
        throw new Error("Está placa ja está cadastrado com outro carro!");
    }
    const updatedCar = await this.carRepository.update(data);
    return updatedCar;
  }
}
