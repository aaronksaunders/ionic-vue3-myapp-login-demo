import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import useFirebaseAuth from "../hooks/firebase-auth";
const state = useFirebaseAuth();


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:  '/home'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(state.user.value)
  if (state.user.value && (to.name === 'login')) {
    next({name : 'home', replace : true})
  } else if (!state.user.value && (to.name !== 'login')) {
    next({name : 'login', replace : true})
  } else {
    next();
  }
});

export default router
