import { getAllRestaurant, getRestaurantPick } from "./restaurant";
import { register, login, authentication } from "./authentication";

export const apiGetAllRestaurant = getAllRestaurant; //取得該使用者所有餐廳資訊
export const apiGetRestaurantPick = getRestaurantPick; // 取得當下的一個餐廳
export const apiRegister = register; // 帳密進行註冊
export const apiLogin = login; // 帳密進行登入
export const apiAuthentication = authentication; // 驗證使用者身分
