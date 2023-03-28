import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { authData } from "../../../shared/types/auth";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const remember = rememberRef.current!.checked;
    const cpf = cpfRef.current!.value;
    const password = passwordRef.current!.value;
    await service({ password, cpf, remember }, url);
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
