<script setup>

  import { NButton, NInput} from 'naive-ui'
  import { reactive, ref } from 'vue'


  let userName = ref("");
  let password = ref("");
  let confirmPassword = ref("");
  let isError = ref(false); //處理由後端回傳的錯誤(如已有此使用者等)

  let isFocus= reactive([false, false, false]); //三個input框是否有被點擊過

  function submitHandler(){
    console.log("---requset here---");
  }


</script>

<template>
  <!--此div會覆蓋整個頁面，但不包含背景顏色-->
  <div class="flex flex-col justify-center items-center  h-screen">
    <img src="../assets/icon.png" alt="" class= "w-32 ">
    <h1 class="text-xl mt-2 mb-4">
      馬上註冊，新增喜歡的餐廳吧！
    </h1>

    <form class = "w-80 mb-20">
      <n-input v-model:value="userName" @blur="isFocus[0] = true ;" 
      size="large" placeholder="使用者名稱" class="rounded-t-md rounded-b-none" />
      <!-- 有被關注過且字串為空才顯示錯誤資訊 -->
      <p class="errorMsg"  v-if="isFocus[0]&!userName"> 請填入此欄位 </p>

      <n-input  v-model:value="password" @blur="isFocus[1] = true;"
      type="password" show-password-on="click"
      placeholder="密碼" size="large" class="rounded-none"/>
      <p class="errorMsg"  v-if="isFocus[1]&!password"> 請填入此欄位 </p>

      <n-input  v-model:value="confirmPassword" @blur="isFocus[2] = true;"
      v-on:keyup.enter="submitHandler" 
      type="password" show-password-on="click"
      placeholder="確認密碼" size="large" class="rounded-t-none rounded-b-md"/>
      <p class="errorMsg"  v-if="isFocus[2]&!confirmPassword"> 請填入此欄位 </p>

      <p class = "text-red-600 mt-2.5 " v-if="isError">帳密有誤，請重新輸入 !</p>
      <n-button  @click="submitHandler"  :disabled="!userName||!password||!confirmPassword"  
      type="primary" class="my-4 p-0 bg-green-600 " >
      <p class = "w-80">註冊</p>
      </n-button>
      <div class="float-right">已經有帳號了嗎?<a class="underline" href="">登入</a></div>
    </form>
    
  </div>


</template>

<style scoped>
  .errorMsg {
    @apply text-xs text-red-600 mb-2;
  }

</style>
