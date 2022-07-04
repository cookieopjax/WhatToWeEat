import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';


const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);


app.mount('#app');
