import React from "react";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Form } from "./styles";
import { carSchema } from "../../../shared/validation/schema/car";
import { usePost } from "../../../shared/hooks/usePost";

type dataCarCreate = {
  model: string;
  color: string;
  licensePlate: string;
  power: number;
  brand: string;
  renavam: string;
};

const initialValues = {
  model: "",
  brand: "",
  color: "",
  licensePlate: "",
  power: 0,
  renavam: "",
};

const NewCar = () => {
  
  const post = usePost();
  
  async function handleCreate(data: dataCarCreate) {
    const { response, error } = await post({ data, url: "/car" });
    console.log(response, error);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => await handleCreate(values),
    validationSchema: carSchema,
  });

  return (
    <Box
      sx={{
        background: "#fff",
        padding: "1em",
        borderRadius: "10px",
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <div className="inputs">
          <TextField
            id="filled-basic"
            value={formik.values.model}
            label="Modelo"
            name="model"
            variant="filled"
            error={formik.touched.model && Boolean(formik.errors.model)}
            onChange={formik.handleChange}
            helperText={formik.touched.model && formik.errors.model}
            onBlur={formik.handleBlur}
            sx={{ width: "28em" }}
          />
          <TextField
            id="filled-basic"
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
            id="filled-basic"
            value={formik.values.licensePlate}
            label="Placa"
            name="licensePlate"
            error={
              formik.touched.licensePlate && Boolean(formik.errors.licensePlate)
            }
            variant="filled"
            helperText={
              formik.touched.licensePlate && formik.errors.licensePlate
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ width: "28em" }}
          />
          <TextField
            id="filled-basic"
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
            id="filled-basic"
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
            id="filled-basic"
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
        </div>
        <input type="submit" />
      </Form>
    </Box>
  );
};

export default NewCar;
