import { createRouter, createWebHashHistory } from "vue-router";
import Map from "@/components/Map.vue";
import GLogin from "@/components/GLogin.vue";
const routes = [
  { path: "/", component: GLogin },
  { path: "/map", component: Map },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
