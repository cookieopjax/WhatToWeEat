<template>
  <n-grid
    x-gap="12"
    y-gap="12"
    cols="1 m:2 xl:3 "
    responsive="screen"
  >
    <n-gi
      v-for="(item, index) in store.restaurantList"
      :key="item.id"
    >
      <div class="border flex">
        <n-image
          v-if="item.image"
          :src="item.image"
          object-fit="cover"
          class="h-28 w-28 flex-shrink-0"
          lazy="true"
        />
        <n-image
          v-else
          object-fit="cover"
          :src="fakeImg"
          class="h-28 w-28 flex-shrink-0"
          lazy="true"
        />
        <div
          class="flex flex-col h-28 p-2 cursor-pointer w-full"
          style="min-width: 0px"
          @click="
            isShowRestModal = true;
            selectedIndex = index;
          "
        >
          <div class="flex-[0_0_30%]">
            <h4 class="truncate">
              {{ item.name }}
            </h4>
          </div>
          <div class="flex-[0_0_40%]">
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
  <RestaurantModal
    mode="view"
    :init-data="store.restaurantList[selectedIndex]"
    :is-show-rest-modal="isShowRestModal"
    :is-show-loading="isShowFormLoading"
    @close="isShowRestModal = false"
    @finish="updateRestaurant"
    @delete="deleteRestaurant"
  />
</template>

<script setup>
import {
  apiUpdateRestaurant,
  apiPostRestImg,
  apiDeleteRestaurant,
} from "@/api";
import { onBeforeMount, ref } from "vue";
import { useStore } from "../store/main";
import { useMessage } from "naive-ui";
import fakeImg from "@/assets/foodEmpty.jpg";

const message = useMessage();
const store = useStore();
const isShowRestModal = ref(false);
const isShowFormLoading = ref(false);
const selectedIndex = ref(0);

const updateRestaurant = async (data) => {
  try {
    isShowFormLoading.value = true;
    const res = await apiUpdateRestaurant(
      data.restaurantForm,
      data.restaurantForm.id
    );
    if (data.img.has("restImg")) {
      await apiPostRestImg(data.img, res.data.id);
    }
    store.getRestaurantData();
    message.success("餐廳編輯成功");
  } catch (err) {
    message.error("餐廳編輯失敗");
    console.error(err);
  }

  isShowRestModal.value = false;
  isShowFormLoading.value = false;
};

const deleteRestaurant = async (data) => {
  try {
    isShowFormLoading.value = true;
    await apiDeleteRestaurant(data.id);
    store.getRestaurantData();
    message.success("餐廳刪除成功");
  } catch (err) {
    message.error("餐廳刪除失敗");
    console.error(err);
  }

  isShowRestModal.value = false;
  isShowFormLoading.value = false;
};

onBeforeMount(() => {
  store.getRestaurantData();
});
</script>
<style scoped>
.truncate-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
