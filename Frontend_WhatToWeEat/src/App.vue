<script setup>
import LoadingPage from "./pages/LoadingPage.vue";
import { useStore } from "./store/main";
const store = useStore();
</script>

<template>
  <LoadingPage v-if="store.isLoadingPage" />
  <router-view v-else />
</template>

<style></style>
