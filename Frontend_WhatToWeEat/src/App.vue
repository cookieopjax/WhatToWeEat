<script setup>
import LoadingPage from "./pages/LoadingPage.vue";
import { NMessageProvider } from "naive-ui";
import { useStore } from "./store/main";
const store = useStore();
</script>

<template>
  <n-message-provider>
    <LoadingPage v-if="store.isLoadingPage" />
    <router-view v-else />
  </n-message-provider>
</template>

<style></style>
