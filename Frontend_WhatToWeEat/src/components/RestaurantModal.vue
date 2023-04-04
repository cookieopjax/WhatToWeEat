<template>
  <n-modal
    v-model:show="isShowModal"
    :on-after-leave="resetForm"
  >
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-spin
        :show="props.isShowLoading"
        class="bg-white"
      >
        <template #description>
          稍等我上傳個圖片
        </template>

        <n-form
          ref="formRef"
          :model="restaurantForm"
          :rules="restFormRules"
          :show-require-mark="false"
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
              <h5 v-if="title === '查看餐廳'">
                {{ restaurantForm.name }}
              </h5>
              <n-input
                v-else
                v-model:value="restaurantForm.name"
                placeholder="餐廳名稱"
              />
            </n-form-item-gi>
            <n-form-item-gi
              label="餐廳電話"
              path="phone"
            >
              <h5 v-if="title === '查看餐廳'">
                {{ restaurantForm.phone }}
              </h5>
              <n-input
                v-else
                v-model:value="restaurantForm.phone"
                placeholder="0912345678"
              />
            </n-form-item-gi>
            <n-form-item-gi
              label="餐廳地址"
              path="address"
            >
              <h5 v-if="title === '查看餐廳'">
                {{ restaurantForm.address }}
              </h5>
              <n-input
                v-else
                v-model:value="restaurantForm.address"
                placeholder="餐廳地址"
              />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <div v-if="title === '查看餐廳'">
          <n-image
            v-if="restaurantForm.image"
            :src="restaurantForm.image"
            object-fit="cover"
            class="h-auto w-full"
            lazy="true"
          />
          <n-image
            v-else
            object-fit="cover"
            :src="fakeImg"
            class="h-auto w-full"
            lazy="true"
          />
        </div>
        <div v-else>
          <p class="mb-1">
            圖片上傳
          </p>
          <!-- 圖片上傳 -->
          <ImageUpload @upload="handleEmitFile" />
        </div>
      </n-spin>

      <template #footer>
        <div class="flex w-full gap-3">
          <n-button
            v-if="title === '編輯餐廳'"
            type=""
            size="large"
            class="ml-auto"
            @click="title = '查看餐廳'"
          >
            取消編輯
          </n-button>
          <n-button
            v-else
            type=""
            size="large"
            class="ml-auto"
            @click="isShowModal = false"
          >
            取消
          </n-button>
          <n-button
            v-if="title === '編輯餐廳'"
            type="error"
            size="large"
            class="bg-wte-danger"
            @click="handleDelete"
          >
            刪除
          </n-button>
          <n-button
            v-if="title === '查看餐廳'"
            type="primary"
            size="large"
            class="bg-wte-primary"
            @click="title = '編輯餐廳'"
          >
            編輯
          </n-button>
          <n-button
            v-else
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
  </n-modal>
</template>
<script setup>
import { reactive, ref, watch, defineEmits, toRaw } from "vue";
import fakeImg from "@/assets/foodEmpty.jpg";
const props = defineProps({
  mode: { type: String, default: "create" },
  initData: {
    type: Object,
    default() {
      return {};
    },
  },
  isShowRestModal: { type: Boolean, default: false },
  isShowLoading: { type: Boolean, default: false },
});
const emit = defineEmits(["finish", "close", "delete"]);
const isShowModal = ref(false);
const title = ref("");
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
const uploadImg = ref(new FormData());
const formRef = ref(null);

watch(
  props,
  () => {
    if (props.mode === "create") {
      title.value = "新增餐廳";
    } else if (props.mode === "view") {
      title.value = "查看餐廳";
    }
    isShowModal.value = props.isShowRestModal;
    Object.keys(props.initData).forEach((key) => {
      restaurantForm[key] = props.initData[key];
    });
  },
  { immediate: true }
);

watch(isShowModal, () => {
  if (!isShowModal.value) {
    emit("close");
  }
});

function resetForm() {
  Object.keys(restaurantForm).forEach((key) => {
    restaurantForm[key] = "";
  });
  uploadImg.value.delete("restImg");
}

function handleEmitFile(e) {
  uploadImg.value = e.value;
}

function handleDelete() {
  emit("delete", {
    id: restaurantForm.id,
  });
}

const handleInputValidation = async (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit("finish", {
        restaurantForm: toRaw(restaurantForm),
        img: uploadImg.value,
      });
    }
  });
};
</script>
<style></style>
