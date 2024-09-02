import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store/index.js";

createApp(App).use(router).use(Vuex).mount("#app");
