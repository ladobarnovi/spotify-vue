import { ref } from "vue";
import { API } from "@/api";

const player = ref<Spotify.SpotifyPlayer>();
const deviceId = ref<string>(null);
const isPlaying = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const currentTrackId = ref<string>(null);

const initPlayer = () => {
  window.onSpotifyWebPlaybackSDKReady = async () => {
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


    player.value?.addListener("player_state_changed", (state => {
      currentTrackId.value = state.track_window.current_track.id;
      isPaused.value = state.paused;
      isPlaying.value = !state.paused;
    }))

    player.value?.connect();
  };
};

const playTracks = async (uris: string[]) => {
  const data = { uris };
  await API.player.play(deviceId.value, data);
};

const togglePlay = async () => {
  await player.value.togglePlay();
};

const playPlaylist = async (context_uri: string, position = 0) => {
  const data = {
    context_uri,
    position_ms: 0,
    offset: {
      position
    }
  };

  await API.player.play(deviceId.value, data);
};

export const usePlayer = () => {
  return {
    initPlayer,
    isPlaying,
    isPaused,
    currentTrackId,
    playTracks,
    playPlaylist,
    togglePlay
  };
};
