<template>
  <div
    class="flex justify-center items-start w-full sm:h-36 gap-3 sm:flex-row flex-col"
  >
    <div
      class="bg-wte-blue-bg w-full flex flex-col sm:flex-row drop-shadow sm:h-full"
      :class="{ 'h-24': !isPick }"
    >
      <h5
        v-if="!isPick"
        class="flex items-center justify-center w-full h-full cursor-pointer"
        @click="getRecommendButton"
      >
        點擊取得今日推薦
      </h5>
      <div
        v-else
        class="w-full flex flex-col sm:flex-row"
      >
        <!--給圖片的畫框-->
        <div class="w-full h-[50vw] sm:w-64 sm:h-36 bg-wte-warning">
          <img
            src="@/assets/bigFood.jpg"
            alt=""
            class="object-cover w-full h-full"
          >
        </div>

        <div class="p-4 flex flex-col justify-center">
          <h2>{{ restaurantData.value.name }}</h2>
          <p>{{ restaurantData.value.address }}</p>
          <p>{{ restaurantData.value.phone }}</p>
        </div>
      </div>
    </div>

    <div class="gap-3 flex flex-row sm:flex-col">
      <n-button
        size="large"
        type="primary"
        class="bg-wte-primary"
      >
        <n-icon>
          <Refresh />
        </n-icon>
        更換餐廳
      </n-button>
      <n-button
        size="large"
        type="primary"
        class="bg-wte-primary"
        @click="isAddRestaurant = true"
      >
        <n-icon>
          <Add />
        </n-icon>
        新增餐廳
      </n-button>
      <n-button
        size="large"
        type="primary"
        class="bg-wte-primary"
      >
        <n-icon>
          <pencil />
        </n-icon>
        編輯餐廳
      </n-button>
    </div>

    <n-modal v-model:show="isAddRestaurant">
      <n-card
        style="width: 600px"
        title="新增餐廳"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form :model="restaurantForm">
          <n-grid
            x-gap="12"
            y-gap="12"
            cols="2"
            responsive="screen"
          >
            <n-form-item-gi label="餐廳名稱">
              <n-input
                v-model:value="restaurantForm.name"
                placeholder="餐廳名稱"
              />
            </n-form-item-gi>
            <n-form-item-gi label="餐廳電話">
              <n-input
                v-model:value="restaurantForm.phone"
                placeholder="餐廳名稱"
              />
            </n-form-item-gi>
            <n-form-item-gi label="餐廳地址">
              <n-input
                v-model:value="restaurantForm.address"
                placeholder="餐廳地址"
              />
            </n-form-item-gi>
          </n-grid>
        </n-form>

        <p class="mb-1">
          圖片上傳
        </p>
        <n-upload list-type="image-card">
          點擊上傳
        </n-upload>

        <template #footer>
          <div class="flex w-full">
            <n-button
              type="primary"
              size="large"
              class="bg-wte-primary ml-auto"
              @click="postRestaurant"
            >
              送出
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import {
  NButton,
  NIcon,
  NModal,
  NCard,
  NGrid,
  NFormItemGi,
  NInput,
  NForm,
  NUpload,
} from "naive-ui";
import { reactive, ref } from "vue";
import { apiGetRestaurantPick, apiPostRestaurant } from "@/api";
import { Refresh, Add, Pencil } from "@vicons/ionicons5";
import { useStore } from "../store/main";
const store = useStore();

// isPick : false:按鈕狀態 true顯示餐廳資訊
let isPick = ref(false);
let isAddRestaurant = ref(false);
let restaurantData = reactive({ value: [] });
let restaurantForm = reactive({
  name: "",
  phone: "",
  address: "",
  image: "",
});

function getRecommendButton() {
  getData();
  isPick.value = true;
}

const getData = async () => {
  try {
    const res = await apiGetRestaurantPick();
    restaurantData.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const postRestaurant = async () => {
  try {
    const res = await apiPostRestaurant(restaurantForm);
    store.getRestaurantData();
    isAddRestaurant.value = false;
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped></style>
