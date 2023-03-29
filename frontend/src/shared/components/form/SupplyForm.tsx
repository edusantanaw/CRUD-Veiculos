import { useFormik } from "formik";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form } from "./styles";
import { supplySchema } from "../../validation/schema/supply";
import { dataSupply, ISupply } from "../../types/supply";
import { useFetching } from "../../hooks/useFetching";
import { ICar } from "../../types/car";

interface props {
  handleClose: () => void;
  handleCreate: (
    data: dataSupply
  ) => Promise<{ message?: string }>;
  supply?: ISupply;
}


function SupplyForm({ handleClose, handleCreate, supply }: props) {
  const [messageError, setMessageError] = useState<string | null>(null);

  const { data } = useFetching<ICar>({ url: "/car" });

  const initialValues = {
    carId: supply?.carId ?? "",
    price: supply?.price ?? 0,
    quantitySupplied: supply?.quantitySupplied ?? 0,
    typeFuel: supply?.typeFuel ?? "",
  };

  async function handleSubmit(data: dataSupply) {
    const { message } = await handleCreate(data);
    if (!message) {
      handleClose();
      return;
    }
    setMessageError(message);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => await handleSubmit(values as dataSupply),
    validationSchema: supplySchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="inputs">
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-label">Carro id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Carro id"
            name="carId"
            value={formik.values.carId}
            error={formik.touched.carId && Boolean(formik.errors.carId)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {data.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                Placa do veiculo: {item.licensePlate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="type_fuel"
          label="Tipo do combustivel"
          name="typeFuel"
          variant="filled"
          value={formik.values.typeFuel}
          error={formik.touched.typeFuel && Boolean(formik.errors.typeFuel)}
          onChange={formik.handleChange}
          helperText={formik.touched.typeFuel && formik.errors.typeFuel}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="price"
          value={formik.values.price}
          label="Preço"
          name="price"
          type="number"
          variant="filled"
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        <TextField
          id="filled-quantity"
          value={formik.values.quantitySupplied}
          label="Quantidade"
          name="quantitySupplied"
          type="number"
          error={
            formik.touched.quantitySupplied &&
            Boolean(formik.errors.quantitySupplied)
          }
          variant="filled"
          helperText={
            formik.touched.quantitySupplied && formik.errors.quantitySupplied
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ width: "28em" }}
        />
        {messageError && <span>{messageError}</span>}
      </div>
      <input type="submit" />
    </Form>
  );
}

export default SupplyForm;
