import axios from "axios";
import { getItem } from "../utils/storage";

axios.defaults.baseURL = "https://casher.mediazone.uz/api/v1/";

axios.interceptors.request.use((config) => {
  const token = getItem("token");
  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization;
  return config;
});

export default axios;
