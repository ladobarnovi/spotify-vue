import { ref } from "vue";
import { API } from "@/api";

const player = ref<Spotify.SpotifyPlayer>();
const deviceId = ref<string>();

export const usePlayer = () => {
  function initPlayer() {
    player.value = new Spotify.Player({
      name: "Custom Web Player",
      getOAuthToken(cb: (token: string) => void) {
        cb(localStorage.token);
      },
      volume: 0.5
    });

    player.value?.addListener("ready", ({ device_id }) => {
      deviceId.value = device_id;
    });
  }

  async function play() {
    await API.player.play("");
  }

  return {
    initPlayer,
    play
  };
};
