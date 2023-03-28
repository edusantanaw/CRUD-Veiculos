import { useState } from "react";
import { AxiosError } from "axios";
import { Api } from "./Api";
import { makeHeaders } from "./makeHeaders";

type data<T> = {
  url: string;
  data: T;
  method: "post" | "put" | "patch";
};

export async function handlePost<T, R>({ url, data, method }: data<T>) {
  try {
    const res = await Api[method]<R>(url, data, makeHeaders());
    return { success: true, data: res.data };
  } catch (error) {
    const message = error as AxiosError<string>;
    return { success: false, message: message.response!.data };
  }
}
