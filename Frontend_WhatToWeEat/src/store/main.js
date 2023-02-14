import { defineStore } from "pinia";
import { apiGetAllRestaurant } from "@/api";

export const useStore = defineStore("storeId", {
  //用arrow function 有完整類型推斷
  state: () => {
    return {
      // 所有屬性將自動推斷類型
      isLogin: false,
      restaurantList: [],
    };
  },
  actions: {
    async getRestaurantData() {
      try {
        const res = await apiGetAllRestaurant();
        this.restaurantList = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },
});

// use in .vue
// import { useStore } from '../store/main';
// const store = useStore();
// store.isLogin = true;
