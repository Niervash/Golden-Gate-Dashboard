import axios from "axios";

const API_JWT = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

export { API_JWT };
