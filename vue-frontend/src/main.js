import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueChartJs from "vue-chartjs";

import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).use(VueChartJs).mount("#app");
