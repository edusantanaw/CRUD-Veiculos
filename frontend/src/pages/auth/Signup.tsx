import React, { useRef } from "react";
import { Container } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Form from "./components/Form";

const Signup = () => {
  return (
    <Container>
      <AccountCircleIcon color="secondary" />
      <h2>Sign up</h2>
      <Form />
      <Link to="/signin">Já tem uma conta?</Link>
    </Container>
  );
};

export default Signup;
