import axios from "axios";

export const api = axios.create({
  baseURL: "https://xpool.com.br/api",
});
