import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./index.css";
import "./customize/all.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(createPinia());

app.mount("#app");
