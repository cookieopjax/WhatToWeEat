import { createApp } from 'vue'
import router from './router'; 5466
import App from './App.vue'
import './index.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
