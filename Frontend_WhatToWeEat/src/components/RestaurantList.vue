<template>
  <n-grid
    x-gap="12"
    y-gap="12"
    cols="1 m:2 xl:3 "
    responsive="screen"
  >
    <n-gi
      v-for="item in restaurantData.value"
      :key="item.id"
    >
      <div class="border flex">
        <img
          src="@/assets/foodEmpty.jpg"
          alt="food"
          class="w-36 bg-cover flex-none"
        >
        <div
          class="flex flex-col h-36 p-2"
          style="min-width: 0px"
        >
          <div class="flex-[0_0_30%]">
            <h4 class="truncate">
              {{ item.name }}
            </h4>
          </div>
          <div class="flex-[0_0_50%]">
            <p class="truncate-3">
              {{ item.address }}
            </p>
          </div>

          <div class="flex-[0_0_20%] flex items-center pt-1">
            <n-button
              type="primary"
              ghost
              class="h-full p-1"
            >
              {{ item.phone }}
            </n-button>
          </div>
        </div>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { NGrid, NGi, NButton } from "naive-ui";
import { apiGetAllRestaurant } from "@/api/index.js";

let restaurantData = reactive({ value: [] });

onMounted(() => {
	getData();
});

const getData = async () => {
	try {
		const res = await apiGetAllRestaurant();
		restaurantData.value = res.data;
	} catch (err) {
		console.error(err);
	}
};
</script>
<style scoped>
.truncate-3 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
