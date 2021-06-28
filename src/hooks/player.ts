import { ref, reactive, toRefs } from "vue";
import { API } from "@/api";

export const MIN_VOLUME = 0.0001;
export const MAX_VOLUME = 1;

export enum Repeat {
  NoRepeat,
  RepeatPlaylist,
  RepeatTrack
}

let trackPositionIntervalId: number = null;

const player = ref<Spotify.SpotifyPlayer>();
const deviceId = ref<string>(null);

const playerStatus = reactive({
  isPlaying: false,
  isPaused: false,
  isShuffle: false,
  isRepeat: Repeat.NoRepeat,
  isExpanded: false,
  volume: 0.5,
  savedVolume: null
});

const playerTrackData = reactive({
  trackId: null,
  trackDuration: null,
  trackPosition: null,
  trackName: null,
  trackAlbum: null,
  trackArtists: null,
  contextUri: null
});

const initPlayer = () => {
  window.onSpotifyWebPlaybackSDKReady = async () => {
    const { devices } = await API.player.devices();

    player.value = new Spotify.Player({
      name: "Custom Web Player",
      getOAuthToken(cb: (token: string) => void) {
        cb(localStorage.token);
      },
      volume: 0.5
    });

    player.value?.addListener("ready", ({ device_id }) => {
      deviceId.value = device_id;
      player.value.getVolume().then(r => console.log(r));
      const activeDevice = devices.find(d => d.is_active);
      if (activeDevice) {
        // API.player.put([deviceId.value]);
      }
    });

    player.value?.addListener("player_state_changed", state => {
      console.log(state);
      playerStatus.isPlaying = !state.paused;
      playerStatus.isPaused = state.paused;
      playerStatus.isShuffle = state.shuffle;
      playerStatus.isRepeat = state.repeat_mode;

      const { current_track } = state.track_window;

      playerTrackData.trackId = current_track.id;
      playerTrackData.trackName = current_track.name;
      playerTrackData.trackAlbum = current_track.album;
      playerTrackData.trackArtists = current_track.artists;
      playerTrackData.trackDuration = state.duration;
      playerTrackData.trackPosition = state.position;
      playerTrackData.contextUri = state.context.uri;

      const linkedFrom = (current_track as any).linked_from.id;
      if (linkedFrom) {
        playerTrackData.trackId = linkedFrom;
      }

      clearInterval(trackPositionIntervalId);

      if (playerTrackData.trackPosition > 0 && playerStatus.isPlaying) {
        trackPositionIntervalId = setInterval(() => {
          playerTrackData.trackPosition += 500;
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
  if (playerTrackData.trackId) {
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
    state: !playerStatus.isShuffle
  });
};

const setVolume = async (v: number) => {
  if (player.value) {
    await player.value.setVolume(v);
    playerStatus.volume = v;
  }
};

const toggleVolume = async () => {
  if (playerStatus.volume > MIN_VOLUME) {
    playerStatus.savedVolume = playerStatus.volume;
    await setVolume(MIN_VOLUME);
  } else {
    await setVolume(playerStatus.savedVolume);
  }
};

const toggleRepeat = async () => {
  let state = "off";

  if (playerStatus.isRepeat === Repeat.NoRepeat) {
    state = "context";
  }

  if (playerStatus.isRepeat === Repeat.RepeatPlaylist) {
    state = "track";
  }

  await API.player.repeat({
    device_id: deviceId.value,
    state
  });
};

const playPlaylist = async (context_uri: string, position = 0, track_uri: string = null) => {
  const data = {
    context_uri,
    offset: {
      position
    }
  };

  await API.player.play(deviceId.value, data);
};

const seek = async (position: number) => {
  if (playerTrackData.trackId) {
    await player.value.seek(position);
  }
};

export const usePlayer = () => {
  return {
    initPlayer,
    playTracks,
    playPlaylist,
    togglePlay,
    seek,
    playNext,
    playPrev,
    toggleShuffle,
    toggleRepeat,
    toggleVolume,
    setVolume
  };
};

export const usePlayerTrackData = () => {
  return {
    ...toRefs(playerTrackData)
  };
};

export const usePlayerStatus = () => {
  return {
    ...toRefs(playerStatus)
  };
};
