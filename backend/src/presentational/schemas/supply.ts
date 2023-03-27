import { z } from "zod";

const supplySchema = {
  carId: z.string({required_error: "O id do carro é obrigatorio!"}),
  typeFuel: z.string({required_error: "O tipo do conbustivel é necessario!"}),
  price: z.number({required_error:"O preço é necessario!"}),
  quantitySupplied: z.number({required_error:"A quantidade abastecida é necessaria!"}),
};

export const createSchemaShema = z.object(supplySchema);

export const updateSupplySchema = z.object({
  ...supplySchema,
  id: z.string({ required_error: "O id é necessario!" }),
});
