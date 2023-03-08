import { createRouter, createWebHistory } from "vue-router";
import { apiAuthentication } from "@/api";
import LoadingPage from "../pages/LoadingPage.vue";
import { useStore } from "../store/main";

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

  const store = useStore();
  store.isLoadingPage = true;
  //檢查權限
  isLogin(store);
});

const isLogin = async (store) => {
  try {
    const res = await apiAuthentication();
    store.isLoadingPage = false;
    return true;
  } catch (err) {
    store.isLoadingPage = false;
    router.push({ path: "/login" });
  }
};

export default router;
