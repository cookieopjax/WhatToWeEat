<script setup>
import { NButton , NCard , NDivider } from 'naive-ui';
import { reactive, ref } from 'vue';
import axios from 'axios';

// isPick : false:按鈕狀態 true顯示餐廳資訊
let isPick = ref(false);
let url = 'http://localhost:4000/getRestaurant';
let restaurantData = reactive({value:[]});

function submitHandler(){
	isPick.value = true;
  axios.get(url).then((res) => {	
		restaurantData.value = res.data;
		console.log(restaurantData.value);
	}
	);
}

</script>

<template>
  <div class="MainPage-margin h-36 flex flex-col justify-center items-center">
		<n-button 
      v-if="!isPick"
      @click="submitHandler"
      size="large"
      type="primary"
      class="bg-green-600"
    >
      不知道要吃什麼，點我
    </n-button>
    <n-card
      v-else
      class="h-36"
      :title="restaurantData.value[0].name"
      embedded
      :bordered="false"
    >
      <p>{{restaurantData.value[0].address}}</p>
      <p>{{restaurantData.value[0].phone}}</p>
      

    </n-card>

    
    
	</div>

  
</template>

<style scoped>
  .MainPage-margin{
    @apply mx-4 md:mx-6 lg:mx-8 xl:mx-12 2xl:mx-16 my-4
  }

</style>