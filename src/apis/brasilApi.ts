import axios from "axios";

export const baseURL = "https://brasilapi.com.br/api";

export const api = axios.create({
  baseURL,
});
