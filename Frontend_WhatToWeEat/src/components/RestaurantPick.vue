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
      <n-button
        type="primary"
        class="bg-wte-primary"
      >
        <i-material-symbols:edit />

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
      <n-button
        circle
        size="large"
        type="primary"
        class="bg-wte-primary"
      >
        <i-material-symbols:edit />
      </n-button>
    </div>

    <!-- 新增餐廳 modal -->
    <n-modal
      v-model:show="isShowAddRestModal"
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
            accept=".jpg, .jpeg, .png"
            :max="1"
            list-type="image"
            :on-before-upload="handleFileUpload"
          >
            <n-upload-dragger>
              <div class="flex items-center justify-center w-full h-14">
                <i-material-symbols:cloud-upload class="h-10 w-10" />
              </div>
              <n-text style="font-size: 16px">
                點擊或拖曳來上傳圖片
              </n-text>
              <n-p
                depth="3"
                style="margin: 8px 0 0 0"
              >
                檔案格式限制為JPG, JPEG, PNG且大小不超過3MB
              </n-p>
            </n-upload-dragger>
          </n-upload>

          <template #footer>
            <div class="flex w-full gap-3">
              <n-button
                type=""
                size="large"
                class="ml-auto"
                @click="isShowAddRestModal = false"
              >
                取消
              </n-button>
              <n-button
                type="primary"
                size="large"
                class="bg-wte-primary"
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
const restaurantForm = reactive({
  name: "",
  phone: "",
  address: "",
  image: "",
});
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
const isShowFormLoading = ref(false);
const uploadImg = ref(new FormData());
const formRef = ref(null);
const imgUploadRef = ref(null);

function resetForm() {
  Object.keys(restaurantForm).forEach((key) => {
    restaurantForm[key] = "";
  });
  imgUploadRef.value.clear();
}

function handleFileUpload(options) {
  let format = options.file.file.type;
  let sizeMb = options.file.file.size / 1024 / 1024;

  if (
    format != "image/png" &&
    format != "image/jpg" &&
    format != "image/jpeg"
  ) {
    message.warning("圖片格式錯誤，僅支持JPG, JPEG, PNG");
    imgUploadRef.value.clear();
    return false;
  }

  if (sizeMb > 3) {
    message.warning("圖片大小過大，請保持在3MB以下");
    imgUploadRef.value.clear();
    return false;
  }
  uploadImg.value.append("restImg", options.file.file);
}

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

const postRestaurant = async () => {
  try {
    isShowFormLoading.value = true;
    const res = await apiPostRestaurant(restaurantForm);
    const imgRes = await apiPostRestImg(uploadImg.value, res.data.id);
    store.getRestaurantData();
    isShowAddRestModal.value = false;
    isShowFormLoading.value = false;
    resetForm();
    message.success("餐廳新增成功");
  } catch (err) {
    isShowAddRestModal.value = false;
    isShowFormLoading.value = false;
    message.error("餐廳新增失敗");
    console.error(err);
  }
};

const handleInputValidation = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      postRestaurant();
    }
  });
};
</script>

<style scoped></style>
