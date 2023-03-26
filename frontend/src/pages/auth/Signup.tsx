import React, { useRef } from "react";
import { Container } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Form from "./components/Form";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {

  const {signup} = useAuth()

  return (
    <Container>
      <AccountCircleIcon color="secondary" />
      <h2>Sign up</h2>
      <Form service={signup} />
      <Link to="/signin">Já tem uma conta?</Link>
    </Container>
  );
};

export default Signup;
