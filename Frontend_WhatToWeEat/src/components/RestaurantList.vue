<template>
  <n-grid
    x-gap="12"
    y-gap="12"
    cols="1 m:2 xl:3 "
    responsive="screen"
  >
    <n-gi
      v-for="(item, index) in restData"
      :key="item.id"
    >
      <div class="border flex">
        <div
          ref="imgContainerRef"
          class="h-28 w-28 flex-shrink-0"
        >
          <n-image
            v-if="item.image"
            :src="item.image"
            :height="imgContainer.height"
            :width="imgContainer.width"
            class="h-28 w-28 flex-shrink-0"
            object-fit="cover"
            lazy="true"
          />
          <n-image
            v-else
            :height="imgContainer.height"
            :width="imgContainer.width"
            object-fit="cover"
            :src="fakeImg"
            lazy="true"
          />
        </div>

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
    :init-data="restData[selectedIndex]"
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
import { onBeforeMount, ref, onMounted, reactive, computed } from "vue";
import { useStore } from "../store/main";
import { useMessage } from "naive-ui";
import fakeImg from "@/assets/foodEmpty.jpg";

const message = useMessage();
const store = useStore();
const isShowRestModal = ref(false);
const isShowFormLoading = ref(false);
const selectedIndex = ref(0);
const imgContainerRef = ref([]);
const imgContainer = reactive({ width: "0", height: "0" });

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

onMounted(() => {
  imgContainer.height = imgContainerRef.value[0].clientHeight;
  imgContainer.width = imgContainerRef.value[0].clientWidth;
});

const restData = computed(() => {
  if (!store.restaurantList.length) {
    return [
      {
        id: 0,
        username: "",
        name: "",
        phone: "",
        address: "",
        image: "",
        createdAt: "",
        updatedAt: "",
      },
    ];
  }

  return store.restaurantList;
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
