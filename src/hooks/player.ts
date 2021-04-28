import { ref, watch } from "vue";
import { API } from "@/api";
import {useTimer} from "@/hooks/timer";

let trackPositionIntervalId: number = null;

const player = ref<Spotify.SpotifyPlayer>();
const deviceId = ref<string>(null);
const isPlaying = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const currentTrackId = ref<string>(null);
const trackDuration = ref<number>(null);
const trackPosition = ref<number>(null);

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

    player.value?.addListener("player_state_changed", state => {
      console.log(state);
      trackPosition.value = state.position;
      trackDuration.value = state.duration;
      currentTrackId.value = state.track_window.current_track.id;
      isPaused.value = state.paused;
      isPlaying.value = !state.paused;

      clearInterval(trackPositionIntervalId);

      if (trackPosition.value > 0 && isPlaying.value) {
        trackPositionIntervalId = setInterval(() => {
          trackPosition.value += 500;
        }, 500);
      }
    });

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

const seek = async (position: number) => {
  await player.value.seek(position);
};

export const usePlayer = () => {
  return {
    initPlayer,
    isPlaying,
    isPaused,
    currentTrackId,
    playTracks,
    playPlaylist,
    togglePlay,

    trackPosition,
    trackDuration,
    seek
  };
};
