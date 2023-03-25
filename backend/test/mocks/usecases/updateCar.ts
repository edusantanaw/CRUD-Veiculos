import { Car } from "../../../src/domain/entities/car";
import { IUpdateUsecase } from "../../../src/domain/usecases/update";
import { updateParams } from "../../../src/presentational/controllers/update";
import { ICar } from "../../../src/types/car";

export class UpdateCarUsecaseSpy implements IUpdateUsecase<updateParams, ICar> {
    public licensePlateused: boolean = false;
    public carExists = true;
    public input: any;
    public async update(data: updateParams): Promise<ICar> {
      this.input = data;
      if (!this.carExists) throw new Error("Não encontrado!");
      if (this.licensePlateused)
        throw new Error("Está placa já esta cadastrado a outro carro!");
      return new Car(data).getCar();
    }
  }
  