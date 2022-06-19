<script setup>
import { NButton, NInput} from 'naive-ui'
import { ref } from 'vue'

let isError = ref(false);

</script>

<template>
  <!--此div會覆蓋整個頁面，但不包含背景顏色-->
  <div class="flex flex-col justify-center items-center  h-screen">
    <img src="../assets/icon.png" alt="" class= "w-32 ">
    <h1 class="text-xl mt-2 mb-4">
      不知道要吃什麼嗎?
    </h1>

    <div class = "w-80 mb-20">
      <n-input  size="large" placeholder="使用者名稱"/>
      <n-input  type="password"
      show-password-on="click"
      placeholder="密碼" size="large" />

      <p class = "text-red-600 mt-2.5 " v-if="isError">帳密有誤，請重新輸入 !</p>
      <n-button type="primary" class="my-4 p-0 bg-green-600 " >
        <p class = "w-80">登入</p>
      </n-button>
      <div class="float-right ">還沒有帳號嗎?<a class="underline" href="">註冊</a></div>
    </div>
    
   


  </div>


    


    
  
  

  
</template>

<style scoped>

</style>
