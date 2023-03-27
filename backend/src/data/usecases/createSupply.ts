import { ICreateUsecase } from "../../domain/usecases/create";
import { Supply } from "../../domain/entities/supply";
import { ICar } from "../../types/car";
import { ISuplly } from "../../types/supply";
import { ICreateRepository } from "../protocols/repository/create";
import { ILoadByIdRepository } from "../protocols/repository/loadByid";

type data = {
  carId: string;
  typeFuel: string;
  price: number;
  quantitySupplied: number;
};

export class CreateSupplyUsecase implements ICreateUsecase<data, ISuplly> {
  constructor(
    private readonly carRepository: ILoadByIdRepository<ICar | null>,
    private readonly supplyRepository: ICreateRepository<ISuplly>
  ) {}

  public async create(data: data): Promise<ISuplly> {
    const carExists = !!(await this.carRepository.loadById(data.carId));
    if (!carExists) throw new Error("Carro não encontrado!");
    const supply = new Supply(data);
    const newSupply = await this.supplyRepository.create(supply.getSupply());
    return newSupply;
  }
}
