<script setup>
import { NPopover } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  userName: { type: String, default: "" },
});

function logoutHandler() {
  localStorage.setItem("access_token", "");
  router.push({ path: "/login" });
}
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
        trigger="click"
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
          <h5>你好! {{ props.userName }}</h5>
          <p
            class="text-right cursor-pointer underline"
            @click="logoutHandler()"
          >
            登出
          </p>
        </div>
      </n-popover>
    </div>
  </nav>
</template>
