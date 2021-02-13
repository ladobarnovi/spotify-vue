import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { checkAuth } from "@/utils/auth";
import axios from "axios";

import initViews from "./views";
initViews();

checkAuth();

axios.defaults.baseURL = "https://api.spotify.com/v1";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
