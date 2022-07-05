<script setup>
import { reactive, onMounted } from 'vue';
import { NCard } from 'naive-ui';
import axios from 'axios';

let url = 'http://localhost:4000/allRestaurant';
let restaurantData = reactive({value:[]});


onMounted(() => {
	axios.get(url).then((res) => {	
		restaurantData.value = res.data;
	}
      
	);
});

</script>

<template>
  <div class="flex">
    <n-card 
      v-for="item in restaurantData.value" 
      :key="restaurantData.id"
      :title="item.name" 
			class="max-w-xs" 
      hoverable
    >	
      <p>地址:{{ item.address }}</p>
      <p>電話:{{ item.phone }}</p>
    </n-card>
  </div>
</template>

<style scoped>

</style>
  