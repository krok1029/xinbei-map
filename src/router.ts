import { createRouter, createWebHashHistory } from "vue-router";
import Map from "@/components/Map.vue";
import GLogin from "@/components/GLogin.vue";
import FLogin from "@/components/FLogin.vue";

import { useGDataStore } from "@/store/gData";

const routes = [
  { path: "/", component: GLogin, name: "GLogin" },
  { path: "/facebook", component: FLogin, name: "FLogin" },
  { path: "/map", component: Map, name: "Map" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, _, next) => {
//   const gData = useGDataStore();
//   console.log("gData", gData.photo);
//   if (to.name == "Map" && !gData.photo) next({ name: "GLogin" });
//   else next();
// });

export default router;
