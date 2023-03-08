<template>
  <div class="h-screen bg-wte-bg">
    <div class="flex flex-col justify-center items-center h-screen m-0 p-0">
      <img
        src="@/assets/icon.png"
        alt=""
        class="w-32"
      >
      <h1 class="text-xl mt-2 mb-4">
        馬上註冊，新增喜歡的餐廳吧！
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
        <p
          v-if="isFocus[0] & !account.userName"
          class="errorMsg"
        >
          請填入此欄位
        </p>

        <n-input
          v-model:value="account.password"
          type="password"
          show-password-on="click"
          placeholder="密碼"
          size="large"
          class="rounded-none"
          @blur="isFocus[1] = true"
        />
        <p
          v-if="isFocus[1] & !account.password"
          class="errorMsg"
        >
          請填入此欄位
        </p>

        <n-input
          v-model:value="account.confirmPassword"
          type="password"
          show-password-on="click"
          placeholder="確認密碼"
          size="large"
          class="rounded-t-none rounded-b-md"
          @blur="isFocus[2] = true"
          @keyup.enter="submitHandler"
        />
        <p
          v-if="isFocus[2] & !account.confirmPassword"
          class="errorMsg"
        >
          請填入此欄位
        </p>

        <p
          v-if="isError"
          class="text-wte-danger mt-2.5"
        >
          帳密有誤，請重新輸入 !
        </p>

        <!-- 檢索account中所有value，只要有一回傳false即disable此button -->
        <n-button
          :disabled="Object.values(account).some((inform) => !inform)"
          type="primary"
          class="my-4 p-0 bg-wte-primary"
          @click="submitHandler"
        >
          <p class="w-80">
            註冊
          </p>
        </n-button>

        <div class="float-right">
          已經有帳號了嗎?<a
            class="underline"
            href="/login"
          >登入</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { NButton, NInput } from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { apiRegister } from "@/api";

const router = useRouter();

let isError = ref(false); //處理由後端回傳的錯誤(如:"已有此使用者名稱"等)

let account = reactive({
  userName: "",
  password: "",
  confirmPassword: "",
});

let isFocus = reactive([false, false, false]); //三個input框是否有被點擊過

function submitHandler() {
  userRegister();
  //router.push({ path: "/login" });
}

const userRegister = async () => {
  try {
    const res = await apiRegister({
      username: account.userName,
      password: account.password,
    });
    router.push({ path: "/login" });
  } catch (err) {
    //帳密重複
    if (err.response.status === 409) {
      isError.value = true;
      return;
    }

    //其他非預期的錯誤
    console.error(err);
  }
};
</script>

<style scoped lang="scss"></style>
