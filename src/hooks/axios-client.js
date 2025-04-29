import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://192.168.3.10:3000",
});
