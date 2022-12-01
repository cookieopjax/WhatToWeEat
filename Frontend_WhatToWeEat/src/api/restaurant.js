import axios from "axios";

const restaurantRequest = axios.create({
	baseURL: import.meta.env.VITE_test_baseUrl,
});

export const getAllRestaurant = () => restaurantRequest.get("/allRestaurant");
export const getRestaurantPick = () => restaurantRequest.get("/getRestaurant");
