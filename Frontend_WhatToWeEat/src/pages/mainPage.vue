<script setup>
import NavBar from "@/components/NavBar.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import RestaurantPick from "@/components/RestaurantPick.vue";
</script>

<template>
  <NavBar />
  <div class="w-screen flex justify-center p-5">
    <div class="flex flex-col gap-4 w-wte-main">
      <RestaurantPick />
      <RestaurantList />
    </div>
  </div>
</template>

<style scoped></style>
