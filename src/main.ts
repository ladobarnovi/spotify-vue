import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { checkAuth } from "@/utils/auth";
import axios from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";
import initViews from "./views";
import {API} from "@/api";
import {useLibrary} from "@/hooks/library";
initViews();

checkAuth();

const { fetchLikedSongs } = useLibrary()
fetchLikedSongs()

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
