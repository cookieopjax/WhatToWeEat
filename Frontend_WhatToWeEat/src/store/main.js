import { defineStore } from "pinia";
import { apiGetAllRestaurant } from "@/api";

export const useStore = defineStore("storeId", {
  //用arrow function 有完整類型推斷
  state: () => {
    return {
      isLogin: false, //是否再登入狀態
      isLoadingPage: false, //是否顯示等待畫面
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
