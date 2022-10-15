<script setup>
import { NPopover } from "naive-ui";
</script>

<template>
  <nav class="bg-wte-bg drop-shadow-md">
    <div class="flex p-2 items-center">
      <img
        src="@/assets/icon.png"
        alt=""
        class="h-8 ml-4"
      >
      <h1 class="text-xl ml-2">
        今天吃什麼
      </h1>
      <n-popover
        trigger="hover"
        :show-arrow="false"
      >
        <template #trigger>
          <img
            src="@/assets/user.png"
            alt=""
            class="h-8 ml-auto"
          >
        </template>
        <div class="w-[200px]">
          <h5>你好! 餅乾</h5>
          <p class="text-right cursor-pointer underline">
            登出
          </p>
        </div>
      </n-popover>
    </div>
  </nav>
</template>
