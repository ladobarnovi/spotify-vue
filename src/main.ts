import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { checkAuth } from "@/utils/auth";
import axios from "axios";

// import {} from "spotify-web-playback-sdk";

axios.defaults.baseURL = "https://api.spotify.com/v1";
import initViews from "./views";
import {API} from "@/api";
initViews();

checkAuth();

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
