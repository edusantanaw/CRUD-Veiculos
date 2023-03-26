import React, { useRef } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { Container, Form } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Signin = () => {
  const cpfRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cpfRef.current) {
      console.log(cpfRef.current.value);
    }
  }

  return (
    <Container>
      <AccountCircleIcon color="secondary" />
      <h2>Sign in</h2>
      <Form onSubmit={handleSubmit}>
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
      </Form>
      <Link href="/signup" sx={{ cursor: "pointer" }} >
        Ainda não tem uma conta?
      </Link>
    </Container>
  );
};

export default Signin;
