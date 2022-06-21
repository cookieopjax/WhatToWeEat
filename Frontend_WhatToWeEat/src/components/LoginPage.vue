<script setup>
import { NButton, NInput} from 'naive-ui'
import { reactive, ref } from 'vue'

let isError = ref(false);

let account = reactive({
    userName : "",
    password : ""
});

let isFocus= reactive([false, false]); //三個input框是否有被點擊過

function submitHandler(){
  console.log("---requset here---");
}

</script>

<template>
  <!--此div會覆蓋整個頁面，但不包含背景顏色-->
  <div class="flex flex-col justify-center items-center  h-screen">
    <img src="../assets/icon.png" alt="" class= "w-32 ">
    <h1 class="text-xl mt-2 mb-4">
      不知道要吃什麼嗎?
    </h1>

    <form class = "w-80 mb-20">
      <n-input v-model:value="account.userName" @blur="isFocus[0] = true ;" 
      size="large" placeholder="使用者名稱" class="rounded-t-md rounded-b-none" />
      <!-- 有被關注過且字串為空才顯示錯誤資訊 -->
      <p class="errorMsg"  v-if="isFocus[0]&!account.userName"> 請填入此欄位 </p>


      <n-input  v-model:value="account.password" @blur="isFocus[1] = true;"
      v-on:keyup.enter="submitHandler" 
      type="password" show-password-on="click"
      placeholder="密碼" size="large" class="rounded-t-none rounded-b-md"/>
      <p class="errorMsg"  v-if="isFocus[1]&!account.password"> 請填入此欄位 </p>

      <p class = "text-red-600 mt-2.5 " v-if="isError">帳密有誤，請重新輸入 !</p>

      <!-- 檢索account中所有value，只要有一回傳false即diable此button -->
      <n-button  @click="submitHandler"  :disabled="!account.userName||!account.password"  
      type="primary" class="my-4 p-0 bg-green-600 " >
      <p class = "w-80">登入</p>
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
