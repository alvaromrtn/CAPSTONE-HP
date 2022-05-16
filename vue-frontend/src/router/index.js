import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  /*{
    path: "/endpoint",
    name: "endpoint",
    component: () => import("../views/Endpoint.vue"),
  },
  {
    path: "/username",
    name: "username",
    component: () => import("../views/Username.vue"),
  },
  {
    path: "/password",
    name: "password",
    component: () => import("../views/Password.vue"),
  },*/
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
