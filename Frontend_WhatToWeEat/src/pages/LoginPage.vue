<template>
  <div class="h-screen bg-wte-bg">
    <div class="flex flex-col justify-center items-center h-screen">
      <img
        src="@/assets/icon.png"
        alt=""
        class="w-32"
      >
      <h1 class="text-xl mt-2 mb-4">
        不知道要吃什麼嗎?
      </h1>

      <form class="w-80 mb-20">
        <n-input
          v-model:value="account.userName"
          size="large"
          placeholder="使用者名稱"
          class="rounded-t-md rounded-b-none"
          @blur="isFocus[0] = true"
        />
        <!-- 有被關注過且字串為空才顯示錯誤資訊 -->
        <div
          v-if="isFocus[0] & !account.userName"
          class="errorMsg"
        >
          請填入此欄位
        </div>

        <n-input
          v-model:value="account.password"
          type="password"
          show-password-on="click"
          placeholder="密碼"
          size="large"
          class="rounded-t-none rounded-b-md"
          @blur="isFocus[1] = true"
          @keyup.enter="submitHandler"
        />
        <div
          v-if="isFocus[1] & !account.password"
          class="errorMsg"
        >
          請填入此欄位
        </div>

        <!-- 檢索account中所有value，只要有一回傳false即disable此button -->
        <n-button
          :disabled="!account.userName || !account.password"
          type="primary"
          class="my-2 p-0 bg-wte-primary"
          @click="submitHandler"
        >
          <p class="w-80">
            登入
          </p>
        </n-button>

        <div
          v-if="isError"
          class="errorMsg"
        >
          帳密有誤，請重新輸入 !
        </div>

        <div class="float-right">
          還沒有帳號嗎?<span
            class="underline cursor-pointer"
            href=""
            @click="registerClick()"
          >註冊</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { NButton, NInput } from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { apiLogin } from "@/api";

const router = useRouter();

let isError = ref(false);

let account = reactive({
  userName: "aaa", //預設帳密方便開發用
  password: "000",
});

let isFocus = reactive([false, false]); //三個input框是否有被點擊過

function submitHandler() {
  userLogin();
}

const userLogin = async () => {
  try {
    const res = await apiLogin({
      username: account.userName,
      password: account.password,
    });
    localStorage.setItem("access_token", res.data.access_token);
    router.push({ path: "/" });
  } catch (err) {
    //帳密錯誤
    if (err.response.status === 401) {
      isError.value = true;
      return;
    }

    //其他非預期的錯誤
    console.error(err);
  }
};

function registerClick() {
  router.push({ path: "/register" });
}
</script>

<style scoped></style>
