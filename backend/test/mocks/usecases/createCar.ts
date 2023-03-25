import { carParams } from "../../../src/data/protocols/repository/createCar";
import { Car } from "../../../src/domain/entities/car";
import { ICreateUsecase } from "../../../src/domain/usecases/create";
import { ICar } from "../../../src/types/car";

export class CreateCarUsecaseSpy implements ICreateUsecase<carParams, ICar> {
    public licensePlateused: boolean = false;
    public input: any;
    public async create(data: carParams): Promise<ICar> {
      this.input = data;
      const car = new Car({ ...data, id: "any_id" }); // mocking id
      if (this.licensePlateused)
        throw new Error("Está placa já esta cadastrado a outro carro!");
      return car.getCar();
    }
  }