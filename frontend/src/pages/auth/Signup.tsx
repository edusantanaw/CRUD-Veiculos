import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import Form from "./components/Form";
import { Container } from "./styles";

const Signup = () => {
  const { handleAuth } = useAuth();

  return (
    <Container>
      <AccountCircleIcon color="secondary" />
      <h2>Sign up</h2>
      <Form url="/signup" service={handleAuth} />

      <Link to="/signin">Já tem uma conta?</Link>
    </Container>
  );
};

export default Signup;
