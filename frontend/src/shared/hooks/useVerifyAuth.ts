import { useState, useLayoutEffect } from "react";
import { useAuth } from "./useAuth";

export function useVerifyAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const { user, token, isLoading } = useAuth();
  

  useLayoutEffect(() => {
    if (user && token) setIsAuth(true);
    else setIsAuth(false);
  }, [user, token]);

  return { isAuth };
}
