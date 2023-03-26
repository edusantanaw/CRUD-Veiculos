import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Form from "./components/Form";
import { Container } from "./styles";

const Signin = () => {

  const {signin} = useAuth()

  return (
    <Container>
      <AccountCircleIcon color="secondary" />
      <h2>Sign in</h2>
      <Form service={signin} />
      <Link to="/signup">Ainda não tem uma conta?</Link>
    </Container>
  );
};

export default Signin;
