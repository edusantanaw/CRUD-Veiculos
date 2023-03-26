import { useContext } from "react";
import { AuthContext } from "../shared/context/Auth";

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
