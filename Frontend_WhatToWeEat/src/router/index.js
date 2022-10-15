import { createRouter, createWebHistory } from "vue-router";

//路由懶加載 (動態載入)
const mainPage = () => import("@/pages/mainPage.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");
const RegisterPage = () => import("@/pages/RegisterPage.vue");
const NotFoundPage = () => import("@/pages/NotFoundPage.vue");

const routes = [
	{ path: "/", component: mainPage },
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

export default router;
