import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

import VueChartJs from "vue-chartjs";

createApp(App).use(router).use(VueChartJs).mount("#app");
