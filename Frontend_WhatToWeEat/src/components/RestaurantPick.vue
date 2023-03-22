<template>
  <div
    class="flex justify-center items-start sm:h-36 gap-3 sm:flex-row flex-col"
  >
    <div
      class="bg-wte-blue-bg w-full flex flex-col sm:flex-row drop-shadow sm:h-full"
      :class="{ 'h-32': !isPick }"
    >
      <h5
        v-show="!isPick"
        class="flex items-center justify-center w-full h-full cursor-pointer"
        @click="getRecommendButton"
      >
        點擊取得今日推薦
      </h5>
      <div
        v-show="isPick"
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
          <h3>{{ restaurantData.value.name }}</h3>
          <p>{{ restaurantData.value.address }}</p>
          <p>{{ restaurantData.value.phone }}</p>
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
        <n-icon>
          <Refresh />
        </n-icon>
        更換餐廳
      </n-button>
      <n-button
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
        type="primary"
        class="bg-wte-primary"
      >
        <n-icon>
          <pencil />
        </n-icon>
        編輯餐廳
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
        <n-icon>
          <Refresh />
        </n-icon>
      </n-button>
      <n-button
        circle
        size="large"
        type="primary"
        class="bg-wte-primary"
        @click="isAddRestaurant = true"
      >
        <n-icon>
          <Add />
        </n-icon>
      </n-button>
      <n-button
        circle
        size="large"
        type="primary"
        class="bg-wte-primary"
      >
        <n-icon>
          <pencil />
        </n-icon>
      </n-button>
    </div>

    <!-- 新增餐廳 modal -->
    <n-modal v-model:show="isAddRestaurant">
      <n-card
        style="width: 600px"
        title="新增餐廳"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          ref="formRef"
          :model="restaurantForm"
          :rules="rules"
        >
          <n-grid
            x-gap="12"
            y-gap="12"
            cols="2"
            responsive="screen"
          >
            <n-form-item-gi
              label="餐廳名稱"
              path="name"
            >
              <n-input
                v-model:value="restaurantForm.name"
                placeholder="餐廳名稱"
              />
            </n-form-item-gi>
            <n-form-item-gi
              label="餐廳電話"
              path="phone"
            >
              <n-input
                v-model:value="restaurantForm.phone"
                placeholder="餐廳電話"
              />
            </n-form-item-gi>
            <n-form-item-gi
              label="餐廳地址"
              path="address"
            >
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
              @click="handleInputValidation"
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
const isPick = ref(false);
const isAddRestaurant = ref(false);
const restaurantData = reactive({ value: [] });
const restaurantForm = reactive({
  name: "",
  phone: "",
  address: "",
  image: "",
});

const formRef = ref(null);
const rules = ref({
  name: {
    required: true,
    message: "請輸入餐廳名稱",
    trigger: ["input", "blur"],
  },
  phone: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("請輸入電話");
      } else if (!/0\d{9}/.test(value)) {
        return new Error("電話格式錯誤");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  address: {
    required: true,
    message: "請輸入餐廳地址",
    trigger: ["input", "blur"],
  },
});

function getRecommendButton() {
  getRestaurantPick();
  isPick.value = true;
}

const getRestaurantPick = async () => {
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

const handleInputValidation = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("Valid");
      postRestaurant();
    } else {
      console.log("Invalid");
      console.log(errors);
    }
  });
};
</script>

<style scoped></style>
