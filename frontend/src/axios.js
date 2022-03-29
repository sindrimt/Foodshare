import axios from "axios";

const baseURL = "/api/";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    withCredentials: true,
  },
});

export default axiosInstance;
