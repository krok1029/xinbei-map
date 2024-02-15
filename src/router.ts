import { createRouter, createWebHashHistory } from "vue-router";
import Map from "@/components/Map.vue";
import GLogin from "@/components/GLogin.vue";
import FLogin from "@/components/FLogin.vue";

import { usePhotoStore } from "@/store/photo";

const routes = [
  { path: "/", component: GLogin, name: "GLogin" },
  { path: "/facebook", component: FLogin, name: "FLogin" },
  { path: "/map", component: Map, name: "Map" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const photo = usePhotoStore();
  if (to.name == "FLogin" && !photo.gPhoto) {
    next({ name: "GLogin" });
    return;
  }
  if (to.name == "Map" && !photo.fPhoto) {
    next({ name: "FLogin" });
    return;
  } else next();
});

export default router;
