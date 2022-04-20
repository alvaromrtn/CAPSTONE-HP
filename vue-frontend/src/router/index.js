import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
