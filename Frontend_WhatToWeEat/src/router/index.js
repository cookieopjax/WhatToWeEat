import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
  {path:'/', component: Login},
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router;