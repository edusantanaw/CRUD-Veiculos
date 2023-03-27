import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useVerifyAuth } from "../shared/hooks/useVerifyAuth";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Cars from "../pages/cars/Cars";
import Header from "../shared/layout/Header";
import Supply from "../pages/supply/Supply";

const Index = () => {
  const { isAuth } = useVerifyAuth();

  return (
    <Router>
      {isAuth && <Header />}
      <Routes>
        <Route
          path="/signin"
          element={!isAuth ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isAuth ? <Cars /> : <Navigate to="/signin" />}
        />
        <Route
          path="/abastecimento"
          element={isAuth ? <Supply /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
};

export default Index;
