import { ref } from "vue";
import { API } from "@/api";

export enum Repeat {
  NoRepeat,
  RepeatPlaylist,
  RepeatTrack
}

let trackPositionIntervalId: number = null;

const player = ref<Spotify.SpotifyPlayer>();
const deviceId = ref<string>(null);
const isPlaying = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const isShuffle = ref<boolean>(false);
const isRepeat = ref<Repeat>(0);
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
      player.value.getCurrentState().then(state => console.log(state));
      API.player.player()
    });

    player.value?.addListener("player_state_changed", state => {
      console.log(state);
      trackPosition.value = state.position;
      trackDuration.value = state.duration;
      currentTrackId.value = state.track_window.current_track.id;
      isPaused.value = state.paused;
      isPlaying.value = !state.paused;
      isShuffle.value = state.shuffle;
      isRepeat.value = state.repeat_mode;

      const linkedFrom = (state.track_window.current_track as any).linked_from.id;
      if (linkedFrom) {
        currentTrackId.value = linkedFrom;
      }

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
  if (currentTrackId.value) {
    await player.value.togglePlay();
  }
};

const playNext = async () => {
  await player.value.nextTrack();
};

const playPrev = async () => {
  await player.value.previousTrack();
};

const toggleShuffle = async () => {
  await API.player.shuffle({
    device_id: deviceId.value,
    state: !isShuffle.value
  });
};

const toggleRepeat = async () => {
  let state = "off";

  if (isRepeat.value === Repeat.NoRepeat) {
    state = "context";
  }

  if (isRepeat.value === Repeat.RepeatPlaylist) {
    state = "track";
  }

  await API.player.repeat({
    device_id: deviceId.value,
    state
  });
}

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
  if (currentTrackId.value) {
    await player.value.seek(position);
  }
};

export const usePlayer = () => {
  return {
    initPlayer,
    isPlaying,
    isPaused,
    isShuffle,
    isRepeat,
    currentTrackId,
    playTracks,
    playPlaylist,
    togglePlay,

    trackPosition,
    trackDuration,
    seek,
    playNext,
    playPrev,
    toggleShuffle,
    toggleRepeat
  };
};
