import { z } from "zod";

const carShcmea = {
  model: z
    .string({ required_error: "O modelo do carro é necessario!" })
    .max(50, "O modelo deve conter no maximo 50 caracteres!"),
  color: z
    .string({ required_error: "A cor do carro é necessario!" })
    .max(35, "A cor deve ter no maximo 35 caracteres!"),
  power: z
    .number({ required_error: "A potencia do carro é necessario!" })
    .max(9999, "A potencia deve ter no maximo 4 digitos"),
  brand: z
    .string({ required_error: "A marca do carro é necessaria" })
    .max(50, "A marca do carro devo conter no maximo 50 caracteres"),
  renavam: z
    .string({ required_error: "O renavan é necessaria!" })
    .length(11, "O renavam deve conter 11 caracteres"),
  licensePlate: z
    .string({ required_error: "A placa do carro é necessaria!" })
    .regex(
      /^[A-Z]{3}[0-9]{4}$/,
      "A placa do veículo não está em um formato válido"
    ),
};

export const createCarShema = z.object(carShcmea);

export const updateCarSchema = z.object({
  ...carShcmea,
  id: z.string({ required_error: "O id é necessario!" }),
});
