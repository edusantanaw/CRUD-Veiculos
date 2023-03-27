import { useState } from "react";
import { AxiosError } from "axios";
import { Api } from "../utils/Api";
import { makeHeaders } from "../utils/makeHeaders";

type data<T> = {
  url: string;
  data: T;
};

interface props {
  method: "post" | "put" | "patch"; 
}

export function usePostOrPut<T>({ method = "post" }: props) {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resetStatus = () => {
    setError(null);
    setResponse(null);
    setLoading(true);
  };

  return async <P>({ url, data }: data<P>) => {
    if (error || !loading) resetStatus(); //case first request fail
    try {
      const res = await Api[method]<T>(url, data, makeHeaders());
      setResponse(res.data);
    } catch (error) {
      const message = error as AxiosError<string>;
      setError(message.response!.data);
    }
    setLoading(false);
    return { response, loading, error };
  };
}
