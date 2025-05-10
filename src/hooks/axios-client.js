import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://pms.onfing.ir",
});
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");


    if (token) {
      config.headers.Authorization = `${token}`;

      if (window.location.pathname === "/login") {
        window.location.href = "/";
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);