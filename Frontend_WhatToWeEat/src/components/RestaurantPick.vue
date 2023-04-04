<template>
  <div
    class="flex justify-center items-start sm:h-36 gap-3 sm:flex-row flex-col"
  >
    <div
      class="bg-wte-blue-bg w-full flex flex-col sm:flex-row drop-shadow sm:h-full"
      :class="{ 'h-32': !isRecommend }"
    >
      <h5
        v-show="!isRecommend"
        class="flex items-center justify-center w-full h-full cursor-pointer"
        @click="getRecommendButton"
      >
        點擊取得今日推薦
      </h5>
      <div
        v-show="isRecommend"
        class="w-full flex flex-col sm:flex-row"
      >
        <!--給圖片的畫框-->
        <div class="w-full h-[50vw] sm:w-64 sm:h-36 bg-wte-warning">
          <n-image
            v-if="recommendedRest.value.image"
            object-fit="cover"
            :src="recommendedRest.value.image"
            lazy="true"
          />
          <n-image
            v-else
            object-fit="cover"
            :src="fakeBannerImg"
            lazy="true"
          />
        </div>

        <div class="p-4 flex flex-col justify-center">
          <h3>{{ recommendedRest.value.name }}</h3>
          <p>{{ recommendedRest.value.address }}</p>
          <p>{{ recommendedRest.value.phone }}</p>
        </div>
      </div>
    </div>

    <!-- 電腦版功能鍵區 -->
    <div class="gap-2 sm:flex flex-row sm:flex-col hidden">
      <n-button
        type="primary"
        class="bg-wte-primary"
        @click="getRestaurantPick"
      >
        <i-zondicons:reload />
        更換餐廳
      </n-button>
      <n-button
        type="primary"
        class="bg-wte-primary"
        @click="isShowAddRestModal = true"
      >
        <i-material-symbols:add />
        新增餐廳
      </n-button>
    </div>

    <!-- 手機板功能鍵區 -->
    <div
      class="w-full flex p-0 h-10 sm:hidden fixed bottom-3 left-0 gap-3 justify-end pr-4"
    >
      <n-button
        circle
        size="large"
        type="primary"
        class="bg-wte-primary"
        @click="getRestaurantPick"
      >
        <i-zondicons:reload />
      </n-button>
      <n-button
        circle
        size="large"
        type="primary"
        class="bg-wte-primary"
        @click="isShowAddRestModal = true"
      >
        <i-material-symbols:add />
      </n-button>
    </div>

    <!-- 新增餐廳 modal -->
    <RestaurantModal
      mode="create"
      :is-show-rest-modal="isShowAddRestModal"
      :is-show-loading="isShowFormLoading"
      @finish="postRestaurant"
      @close="isShowAddRestModal = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { apiGetRestaurantPick, apiPostRestaurant, apiPostRestImg } from "@/api";
import { useStore } from "../store/main";
import { useMessage } from "naive-ui";
import fakeBannerImg from "@/assets/bigFood.jpg";

const message = useMessage();
const store = useStore();
const isRecommend = ref(false); // isRecommend : false:按鈕狀態 true顯示餐廳資訊
const recommendedRest = reactive({ value: [] });
const isShowAddRestModal = ref(false);
const isShowFormLoading = ref(false);

function getRecommendButton() {
  getRestaurantPick();
  isRecommend.value = true;
}

const getRestaurantPick = async () => {
  try {
    const res = await apiGetRestaurantPick();
    recommendedRest.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const postRestaurant = async (data) => {
  try {
    isShowFormLoading.value = true;
    const res = await apiPostRestaurant(data.restaurantForm);
    if (data.img.has("restImg")) {
      await apiPostRestImg(data.img, res.data.id);
    }
    store.getRestaurantData();
    message.success("餐廳新增成功");
  } catch (err) {
    message.error("餐廳新增失敗");
    console.error(err);
  }

  isShowAddRestModal.value = false;
  isShowFormLoading.value = false;
};
</script>

<style scoped></style>
