import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10000,
});

export default httpClient;
