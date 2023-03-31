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
    <n-modal
      v-model:show="isAddRestaurant"
      :on-after-leave="resetForm"
    >
      <n-spin
        :show="isShowFormLoading"
        class="bg-white"
      >
        <template #description>
          稍等我上傳個圖片
        </template>
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
            :rules="restFormRules"
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
                  placeholder="0912345678"
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
          <n-upload
            ref="imgUploadRef"
            directory-dnd
            :max="1"
            list-type="image"
            @change="handleFileUpload"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon
                  size="48"
                  :depth="3"
                >
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                點擊或拖曳來上傳圖片
              </n-text>
              <n-p
                depth="3"
                style="margin: 8px 0 0 0"
              >
                檔案格式限制為JPG, JPEG, PNG且大小不超過5MB
              </n-p>
            </n-upload-dragger>
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
      </n-spin>
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
  NUploadDragger,
  NText,
  NP,
  NImage,
  NSpin,
} from "naive-ui";
import { reactive, ref } from "vue";
import { apiGetRestaurantPick, apiPostRestaurant, apiPostRestImg } from "@/api";
import {
  Refresh,
  Add,
  Pencil,
  ArchiveOutline as ArchiveIcon,
} from "@vicons/ionicons5";
import { useStore } from "../store/main";

import fakeBannerImg from "@/assets/bigFood.jpg";
import { useMessage } from "naive-ui";
const message = useMessage();
const store = useStore();

// isPick : false:按鈕狀態 true顯示餐廳資訊
const isPick = ref(false);
const isAddRestaurant = ref(false);
const recommendedRest = reactive({ value: [] });
const restaurantForm = reactive({
  name: "",
  phone: "",
  address: "",
  image: "",
});
const isShowFormLoading = ref(false);
const uploadImg = ref(new FormData());
const formRef = ref(null);
const restFormRules = ref({
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
const imgUploadRef = ref(null);

function resetForm() {
  Object.keys(restaurantForm).forEach((key) => {
    restaurantForm[key] = "";
  });
  imgUploadRef.value.clear();
}

function handleFileUpload(options) {
  uploadImg.value.append("restImg", options.file.file);
}

function getRecommendButton() {
  getRestaurantPick();
  isPick.value = true;
}

const getRestaurantPick = async () => {
  try {
    const res = await apiGetRestaurantPick();
    recommendedRest.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const postRestaurant = async () => {
  try {
    isShowFormLoading.value = true;
    const res = await apiPostRestaurant(restaurantForm);
    const imgRes = await apiPostRestImg(uploadImg.value, res.data.id);
    store.getRestaurantData();
    isAddRestaurant.value = false;
    isShowFormLoading.value = false;
    resetForm();
    message.success("餐廳新增成功");
  } catch (err) {
    isAddRestaurant.value = false;
    isShowFormLoading.value = false;
    message.success("餐廳新增失敗");
    console.error(err);
  }
};

const handleInputValidation = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      postRestaurant();
    } else {
      console.err(errors);
    }
  });
};
</script>

<style scoped></style>
