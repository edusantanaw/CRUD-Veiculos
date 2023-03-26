import { useEffect, useState } from "react";
import { tokenKey } from "../constants/keys";
import { Api } from "../utils/Api";
import { AxiosError } from "axios";

interface props {
  url: string;
}

function makeHeaders() {
  const token = localStorage.getItem(tokenKey);
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

export function useFetching<T>({ url }: props) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  async function fetchData() {
    try {
      const response = await Api.get<T[]>(url, makeHeaders());
      setData(()=> response.data);
    } catch (error) {
      const message = error as AxiosError<string>;
      setError(() => message.response!.data);
    }
    setLoading(false);
  }

  return {data, loading, error}
}
