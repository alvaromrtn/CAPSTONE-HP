import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/esperanza_de_vida",
    name: "esperanza_de_vida",
    component: () => import("../views/EsperanzaVida.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/covid_casos",
    name: "casos",
    component: () => import("../views/Covid_Casos.vue"),
  },
  {
    path: "/covid_muertes",
    name: "muertes",
    component: () => import("../views/Covid_Muertes.vue"),
  },
  {
    path: "/covid_tests",
    name: "test",
    component: () => import("../views/Covid_Tests.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
