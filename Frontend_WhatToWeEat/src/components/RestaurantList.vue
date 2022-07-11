<script setup>
import { reactive, onMounted } from 'vue';
import { NCard , NGrid, NGi } from 'naive-ui';
import axios from 'axios';

let url = 'http://localhost:4000/allRestaurant';
let restaurantData = reactive({value:[]});

onMounted(() => {
	axios.get(url).then((res) => {	
		restaurantData.value = res.data;
		//console.log(restaurantData.value);
	}
	);
});

</script>

<template>
  <div class="m-4 md:m-6 lg:m-8 xl:m-12 2xl:m-16">
    <n-grid
      x-gap="12"
      y-gap="10"
      cols="1 s:2 m:3 l:4 "
      responsive="screen"
    >
      <n-gi 
        v-for="item in restaurantData.value" 
        :key="restaurantData.id"
        class="flex items-start"
      >
        <n-card 
          :title="item.name" 
          hoverable
        >	
          <p>地址:{{ item.address }}</p>
          <p>電話:{{ item.phone }}</p>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>

</style>
  