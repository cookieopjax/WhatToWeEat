<template>
  <div class="flex flex-col justify-center items-center w-full sm:h-36">
    <n-button
      v-if="!isPick"
      size="large"
      type="primary"
      class="bg-wte-primary"
      @click="submitHandler"
    >
      不知道要吃什麼，點我
    </n-button>
    <div
      v-else
      class="bg-wte-blue-bg h-full w-full flex flex-col sm:flex-row drop-shadow"
    >
      <!--給圖片的畫框-->
      <div class="w:full h-[50vw] sm:w-64 sm:h-36 bg-wte-warning">
        <img
          src="@/assets/bigFood.jpg"
          alt=""
          class="object-cover w-full h-full"
        >
      </div>

      <div class="p-4 flex flex-col justify-center">
        <h2>{{ restaurantData.value[0].name }}</h2>
        <p>{{ restaurantData.value[0].address }}</p>
        <p>{{ restaurantData.value[0].phone }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton } from "naive-ui";
import { reactive, ref } from "vue";
import axios from "axios";

// isPick : false:按鈕狀態 true顯示餐廳資訊
let isPick = ref(false);
let url = import.meta.env.VITE_baseUrl + "getRestaurant";
let restaurantData = reactive({ value: [] });

function submitHandler() {
	axios.get(url).then((res) => {
		restaurantData.value = res.data;
		isPick.value = true;
	});
}
</script>

<style scoped></style>
