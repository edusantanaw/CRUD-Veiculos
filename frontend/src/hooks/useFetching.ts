import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { AxiosError } from "axios";
import { makeHeaders } from "../utils/makeHeaders";

interface props {
  url: string;
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
      setData(() => response.data);
    } catch (error) {
      const message = error as AxiosError<string>;
      setError(() => message.response!.data);
    }
    setLoading(false);
  }

  return { data, loading, error };
}
