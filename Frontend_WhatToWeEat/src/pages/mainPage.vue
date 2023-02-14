<script setup>
import { onMounted, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import RestaurantList from "@/components/RestaurantList.vue";
import RestaurantPick from "@/components/RestaurantPick.vue";
import { apiAuthentication } from "@/api";

let userName = ref("");

const userRegister = async () => {
  try {
    const res = await apiAuthentication();
    userName.value = res.data.username;
  } catch (err) {
    //其他非預期的錯誤
    console.error(err);
  }
};

onMounted(() => {
  userRegister();
});
</script>

<template>
  <NavBar :user-name="userName" />
  <div class="flex justify-center p-5">
    <div class="flex flex-col gap-4 w-wte-main">
      <RestaurantPick />
      <RestaurantList />
    </div>
  </div>
</template>

<style scoped></style>
