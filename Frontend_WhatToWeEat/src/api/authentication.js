import axios from "axios";

const restaurantRequest = axios.create({
	baseURL: import.meta.env.VITE_baseUrl,
});

const authRequest = axios.create({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	},
	baseURL: import.meta.env.VITE_baseUrl,
});

export const register = (data) => restaurantRequest.post("/register", data);
export const login = (data) => restaurantRequest.post("/login", data);
export const authentication = () => authRequest.get("/authentication");
