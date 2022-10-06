import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import mainPage from "../pages/mainPage.vue";

const routes = [
	{ path: "/", component: mainPage },
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
];

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

export default router;
