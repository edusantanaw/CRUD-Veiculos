import React, { useRef } from "react";
import { FormContainer } from "../styles";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { data } from "../../../shared/types/auth";

interface props {
  service: (data: data) => Promise<void>;
}

function Form({ service }: props) {
  const cpfRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { error } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cpf = cpfRef.current!.value;
    const password = passwordRef.current!.value;
    await service({ password, cpf });
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
      {error && <span>{String(error)}</span>}
    </FormContainer>
  );
}

export default Form;
