import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_baseUrl,
});

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

export const apiRegister = (data) => instance.post("/register", data);
export const apiLogin = (data) => instance.post("/login", data);
export const apiAuthentication = () => instance.get("/authentication");
export const apiGetAllRestaurant = () => instance.get("/restaurants");
export const apiPostRestaurant = (data) => instance.post("/restaurants", data);
export const apiGetRestaurantPick = () => instance.get("/recommendation");
export const apiPostRestImg = (data, id) =>
  instance.post(`/restaurants/image/${id}`, data);
