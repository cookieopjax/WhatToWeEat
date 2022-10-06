<script setup>
import { NButton, NInput} from 'naive-ui';
import { reactive, ref } from 'vue';

let isError = ref(false);

let account = reactive({
	userName : '',
	password : ''
});

let isFocus= reactive([false, false]); //三個input框是否有被點擊過

function submitHandler(){
	console.log('---request here---');
}

</script>

<template>
  <div class="h-screen bg-main-pink">
    <div class="flex flex-col justify-center items-center  h-screen">
      <img
        src="../assets/icon.png"
        alt=""
        class="w-32 "
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
          @blur="isFocus[0] = true ;"
        />
        <!-- 有被關注過且字串為空才顯示錯誤資訊 -->
        <p
          v-if="isFocus[0]&!account.userName"
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
          class="rounded-t-none rounded-b-md"
          @blur="isFocus[1] = true;"
          @keyup.enter="submitHandler"
        />
        <p
          v-if="isFocus[1]&!account.password"
          class="errorMsg"
        >
          請填入此欄位
        </p>

        <p
          v-if="isError"
          class="text-red-600 mt-2.5 "
        >
          帳密有誤，請重新輸入 !
        </p>

        <!-- 檢索account中所有value，只要有一回傳false即disable此button -->
        <n-button
          :disabled="!account.userName||!account.password"
          type="primary"  
          class="my-4 p-0 bg-green-600 "
          @click="submitHandler"
        >
          <p class="w-80">
            登入
          </p>
        </n-button>

        <div class="float-right">
          還沒有帳號嗎?<a
            class="underline"
            href=""
          >註冊</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .errorMsg {
	@apply text-xs text-red-600 mb-2;
  }

</style>
