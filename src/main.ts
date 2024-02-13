import { createApp } from "vue";
import router from "@/router";
import "./style.css";
import App from "./App.vue";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");
