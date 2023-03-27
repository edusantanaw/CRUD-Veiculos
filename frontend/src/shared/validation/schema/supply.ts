import * as yup from "yup";

export const supplySchema = yup.object().shape({
  carId: yup.string().required("O id do conbustivel é necessario!"),
  typeFuel: yup.string().required("O tipo de conbustivel é necessario!"),
  price: yup
    .number()
    .required("O preco é necessario!")
    .min(0.01, "O preco é necessario!"),
  quantitySupplied: yup
    .number()
    .required("A quantidade é necessaria!")
    .min(1, "A quantidade é necessia!"),
});
