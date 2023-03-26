import React, { useRef } from "react";
import { FormContainer } from "../styles";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

interface props<T> {
  service?: (data: T) => Promise<void>;
}

function Form<T>({}: props<T>) {
  const cpfRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cpfRef.current) {
      console.log(cpfRef.current.value);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup
        sx={{ display: "flex", flexDirection: "column", gap: "1.5em" }}
      >
        <TextField
          id="cpf"
          label="Cpf"
          variant="outlined"
          inputRef={cpfRef}
          color="secondary"
        />
        <TextField
          id="password"
          type="password"
          color="secondary"
          label="Password"
          variant="outlined"
          inputRef={passwordRef}
        />
      </FormGroup>
      <FormControlLabel
        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
        control={<Checkbox size="small" color="secondary" />}
        label="Manter-me logado"
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleSubmit}
      >
        Enviar
      </Button>
    </FormContainer>
  );
}

export default Form;