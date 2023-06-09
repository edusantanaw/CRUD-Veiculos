import { useFormik } from "formik";
import { useState } from "react";
import { carSchema } from "../../validation/schema/car";
import { TextField } from "@mui/material";
import { Form } from "./styles";
import { ICar } from "../../types/car";

interface props<T> {
  handleClose: () => void;
  handleCreate: (data: T) => Promise<{ message?: string }>;
  car?: ICar;
}

function CarForm<T>({ handleClose, handleCreate, car }: props<T>) {
  const [messageError, setMessageError] = useState<string | null>(null);

  const initialValues = {
    model: car?.model ?? "",
    brand: car?.brand ?? "",
    color: car?.color ?? "",
    licensePlate: car?.licensePlate ?? "",
    power: car?.power ?? 0,
    renavam: car?.renavam ?? "",
  };

  async function handleSubmit(data: T) {
    const { message } = await handleCreate(data);
    if (!message) {
      handleClose();
      return;
    }
    setMessageError(message);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => await handleSubmit(values as T),
    validationSchema: carSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="inputs">
        <TextField
          id="filled-model"
          label="Modelo"
          name="model"
          variant="filled"
          value={formik.values.model}
          error={formik.touched.model && Boolean(formik.errors.model)}
          onChange={formik.handleChange}
          helperText={formik.touched.model && formik.errors.model}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-color"
          value={formik.values.color}
          label="Cor"
          name="color"
          variant="filled"
          error={formik.touched.color && Boolean(formik.errors.color)}
          helperText={formik.touched.color && formik.errors.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-plate"
          value={formik.values.licensePlate}
          label="Placa"
          name="licensePlate"
          error={
            formik.touched.licensePlate && Boolean(formik.errors.licensePlate)
          }
          variant="filled"
          helperText={formik.touched.licensePlate && formik.errors.licensePlate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-power"
          value={formik.values.power}
          label="Potencia"
          name="power"
          type="number"
          variant="filled"
          error={formik.touched.power && Boolean(formik.errors.power)}
          helperText={formik.touched.power && formik.errors.power}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-brand"
          value={formik.values.brand}
          label="Marca"
          name="brand"
          variant="filled"
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          onChange={formik.handleChange}
          helperText={formik.touched.brand && formik.errors.brand}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-renavam"
          value={formik.values.renavam}
          label="Renavam"
          name="renavam"
          error={formik.touched.renavam && Boolean(formik.errors.renavam)}
          variant="filled"
          onChange={formik.handleChange}
          helperText={formik.touched.renavam && formik.errors.renavam}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        {messageError && <span>{messageError}</span>}
      </div>
      <input type="submit" />
    </Form>
  );
}

export default CarForm;
