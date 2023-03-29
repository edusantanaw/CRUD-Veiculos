import { ISuplly } from "../../types/supply";
import { supply } from "../prisma";

export class SupplyRepository {
  public async create(data: ISuplly) {
    const newSupply = await supply.create({ data: data });
    return newSupply as ISuplly;
  }

  public async loadById(id: string) {
    const supplyLoaded = await supply.findFirst({ where: { id } });
    return supplyLoaded as ISuplly;
  }

  public async delete(id: string) {
    await supply.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
  }

  public async update(data: ISuplly){
    const updated = await supply.update({
      where: {id: data.id},
      data: data
    })
    return updated as ISuplly
  }

  public async loadByCarId(carId: string) {
    const data = await supply.findMany({ where: { carId, deleted: false } });
    return data;
  }

  public async loadAll() {
    const supplus = await supply.findMany({ where: { deleted: false } });
    return supplus as ISuplly[];
  }
}
