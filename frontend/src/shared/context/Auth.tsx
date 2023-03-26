import { createContext, useState, useEffect } from "react";
import { signinService, signupService } from "../../services/auth";
import { IAuthContext } from "../types/auth";
import { IUser } from "../types/user";

export const AuthContext = createContext({} as IAuthContext);

interface props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(()=> {
    if(token && user) {
        setAuth(true)
    }
  }, [token, user])

  async function signin(data: { cpf: string; password: string }) {
    try {
      const response = await signinService(data);
      setUser(() => response.user);
      setToken(() => response.token);
    } catch (error) {
      setError(error);
    }
  }

  async function signup(data: { cpf: string; password: string }) {
    try {
      const response = await signupService(data);
      setUser(() => response.user);
      setToken(() => response.token);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <AuthContext.Provider value={{ auth, error, signin, signup, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};
