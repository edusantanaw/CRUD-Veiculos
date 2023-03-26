import { tokenKey } from "../constants/keys";

export function makeHeaders() {
  const localToken = localStorage.getItem(tokenKey);
  const sessionTOken = sessionStorage.getItem(tokenKey);
  return {
    headers: {
      authorization: `Bearer ${localToken ?? sessionTOken}`,
    },
  };
}
