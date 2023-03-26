import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";

const Index = () => {
  const { auth } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={!auth ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!auth ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/" element={auth ? <Home /> : <Navigate to="signin" />} />
      </Routes>
    </Router>
  );
};

export default Index;
