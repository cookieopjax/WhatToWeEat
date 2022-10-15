<template>
  <div
    class="bg-wte-bg w-screen h-screen flex items-center justify-center pb-10"
  >
    <n-result
      status="404"
      title="404 資源不存在"
      size="large"
    >
      <template #footer>
        <n-button
          type="primary"
          class="bg-wte-primary"
          @click="backToHomePage()"
        >
          回到主頁看看
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { NButton, NResult } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();

function backToHomePage() {
	router.push({ path: "/" });
}
</script>
