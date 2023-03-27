import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useVerifyAuth } from "../shared/hooks/useVerifyAuth";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Header from "../shared/layout/Header";

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
          element={isAuth ? <Home /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
};

export default Index;
