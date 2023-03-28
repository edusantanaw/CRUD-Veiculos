import { createContext, useState, useLayoutEffect } from "react";
import { userKey, tokenKey } from "../constants/keys";
import { authService } from "../../services/auth";
import { authData, IAuthContext } from "../types/auth";
import { IUser } from "../types/user";

export const AuthContext = createContext({} as IAuthContext);

interface props {
  children: React.ReactNode;
}

function getLocalStorage() {
  const user = localStorage.getItem(userKey);
  const token = localStorage.getItem(tokenKey);
  return { user, token };
}

function getSessionStorage() {
  const user = sessionStorage.getItem(userKey);
  const token = sessionStorage.getItem(tokenKey);
  return { user, token };
}

export const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useLayoutEffect(() => {
    const local = getLocalStorage();
    const session = getSessionStorage();
    if (local.token && local.user) {
      setUser(JSON.parse(local.user));
      setToken(local.token);
    } else if (session.token && session.user) {
      setUser(JSON.parse(session.user));
      setToken(session.token);
    }
    setIsLoading(false)
  }, []);

  async function handleAuth(data: authData, url: string) {
    try {
      const { remember, ...rest } = data;
      const response = await authService(rest, url);
      setUser(() => response.user);
      setToken(() => response.token);
      makeStorage({ ...response, remember });
      clearError();
    } catch (error) {
      setError(error as string);
    }
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    sessionStorage.removeItem(userKey);
    sessionStorage.removeItem(tokenKey);
    setToken(() => null);
    setUser(() => null);
  }

  function clearError() {
    setError(null);
  }

  function makeStorage(data: {
    user: IUser;
    token: string;
    remember: boolean;
  }) {
    if (data.remember) {
      localStorage.setItem(userKey, JSON.stringify(data.user));
      localStorage.setItem(tokenKey, data.token);
      return;
    }
    sessionStorage.setItem(userKey, JSON.stringify(data.user));
    sessionStorage.setItem(tokenKey, data.token);
  }

  return (
    <AuthContext.Provider
      value={{isLoading,  error, logout, handleAuth, token, user, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
