import axios from "axios";

export const baseUrl = "http://localhost:3000/api";

export const Api = axios.create({
  baseURL: baseUrl,
});
