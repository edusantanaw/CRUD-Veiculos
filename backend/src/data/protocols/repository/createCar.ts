import { ICar } from "../../../types/car";

export interface ICreateCarRepository {
  loadByLicensePlate: (licensePlate: string) => Promise<ICar | null>;
    create: (data: ICar) => Promise<ICar>;
  }
  
  export type carParams = {
    model: string;
    licensePlate: string;
    color: string;
    power: string;
    brand: string;
    renavam: string;
  };
  