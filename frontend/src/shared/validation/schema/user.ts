import * as yup from "yup";

export const userSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("O cpf é necessario!")
    .matches(/^(\d{3}\.){2}\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido'),
  password: yup.string().required("A senha é necessria!"),
});
