import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { authData } from "../../../shared/types/auth";
import { userSchema } from "../../../shared/validation/schema/user";
import { FormContainer } from "../styles";

interface props {
  service: (data: authData, url: string) => Promise<void>;
  url: string;
}

function Form({ service, url }: props) {
  const cpfRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const rememberRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const { error, clearError } = useAuth();

  useEffect(() => {
    if (error) clearError();
  }, [location.pathname]);

  async function handleSubmit({
    cpf,
    password,
  }: {
    cpf: string;
    password: string;
  }) {
    const remember = rememberRef.current!.checked;
    await service({ password, cpf, remember }, url);
  }

  const initialValues = {
    cpf: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => await handleSubmit(values),
    validationSchema: userSchema,
  });

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <FormGroup
        sx={{ display: "flex", flexDirection: "column", gap: "1.5em" }}
      >
        <TextField
          id="cpf"
          label="Cpf"
          variant="outlined"
          inputRef={cpfRef}
          color="secondary"
          value={formik.values.cpf}
          error={formik.touched.cpf && Boolean(formik.errors.cpf)}
          onChange={formik.handleChange}
          helperText={formik.touched.cpf && formik.errors.cpf}
          onBlur={formik.handleBlur}
        />
        <TextField
          id="password"
          type="password"
          color="secondary"
          label="Password"
          variant="outlined"
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          onChange={formik.handleChange}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          inputRef={passwordRef}
        />
      </FormGroup>
      <FormControlLabel
        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
        control={
          <Checkbox size="small" color="secondary" inputRef={rememberRef} />
        }
        label="Manter-me logado"
      />
      {error && (
        <Typography color="red" textAlign="center">
          {error}
        </Typography>
      )}
        <input type="submit" />
    </FormContainer>
  );
}

export default Form;
