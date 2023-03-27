import * as yup from "yup";

export const carSchema = yup.object().shape({
    model: yup
      .string()
      .required("O modelo do carro é necessario!")
      .max(50, "O modelo deve conter no maximo 50 caracteres!"),
    color: yup
      .string()
      .required("A cor do carro é necessario!")
      .max(35, "A cor deve ter no maximo 35 caracteres!"),
    power: yup
      .number()
      .min(1, "A potencia do carro é necessario!")
      .required("A potencia do carro é necessario!")
      .max(9999, "A potencia deve ter no maximo 4 digitos"),
    brand: yup
      .string()
      .required("A marca do carro é necessaria")
      .max(50, "A marca do carro devo conter no maximo 50 caracteres"),
    renavam: yup
      .string()
      .required("O renavan é necessaria!")
      .length(11, "Deve ter 11 caracteres"),
    licensePlate: yup
      .string()
      .required("A placa do carro é necessaria!")
      .test("placa", "Placa inválida", function (value) {
        const regex = /^[A-Z]{3}[0-9]{4}$/; // Expressão regular para validar a placa
        return regex.test(value); // retorna true se a placa for válida
      }),
  });
  