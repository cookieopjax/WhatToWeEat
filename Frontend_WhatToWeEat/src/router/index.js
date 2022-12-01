import { createRouter, createWebHistory } from "vue-router";
import { apiAuthentication } from "@/api";

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

router.beforeEach((to, from) => {
	//登入或註冊路由不必檢查，直接通過
	if (to.path === "/login" || to.path === "/register") {
		return true;
	}

	//檢查權限
	isLogin();
});

const isLogin = async () => {
	try {
		const res = await apiAuthentication();
		return true;
	} catch (err) {
		router.push({ path: "/login" });
	}
};

export default router;
