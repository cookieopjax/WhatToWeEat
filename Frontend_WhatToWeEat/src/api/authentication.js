import axios from "axios";

const restaurantRequest = axios.create({
	baseURL: import.meta.env.VITE_baseUrl,
});

const authRequest = axios.create({
	baseURL: import.meta.env.VITE_baseUrl,
});

authRequest.interceptors.request.use(function (config) {
	config.headers["Authorization"] = `Bearer ${localStorage.getItem(
		"access_token"
	)}`;
	return config;
});

export const register = (data) => restaurantRequest.post("/register", data);
export const login = (data) => restaurantRequest.post("/login", data);
export const authentication = () => authRequest.get("/authentication");
