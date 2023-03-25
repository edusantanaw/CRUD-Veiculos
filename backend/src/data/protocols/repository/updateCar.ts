import { ICar } from "../../../types/car";

export interface IUpdateCarRepository {
    loadById: (id: string) => Promise<ICar | null>;
    loadByLicensePlate: (licensePlate: string) => Promise<ICar | null>;
    update: (data: ICar) => Promise<ICar>;
  }