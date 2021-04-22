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

window.onSpotifyWebPlaybackSDKReady = async () => {
  const player = new Spotify.Player({
    name: "Custom Web Player",
    getOAuthToken(cb: (token: string) => void) {
      console.log("Ravi aq ra xdeba");
      cb(localStorage.token);
    },
    volume: 0.5
  });

  console.log(player);

  player.addListener("ready", async ({ device_id }: { device_id: string }) => {
    console.log("Ready");
    console.log(device_id);

    await API.player.play(device_id);
    console.log("Getting current state");
    const state = await player.getCurrentState()
    console.log(state);
    console.log("Current State Got");
  })

  player.connect()

};
