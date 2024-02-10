import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(VueAwesomePaginate).mount("#app");
