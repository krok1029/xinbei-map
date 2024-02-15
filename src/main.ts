import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import "./style.css";
import App from "./App.vue";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueAwesomePaginate);
app.mount("#app");
