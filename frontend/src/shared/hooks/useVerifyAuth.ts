import { useState, useLayoutEffect } from "react";
import { useAuth } from "./useAuth";

export function useVerifyAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const { auth } = useAuth();
  useLayoutEffect(() => {
    if (auth) setIsAuth(true);
  }, [auth]);
  return { isAuth };
}
