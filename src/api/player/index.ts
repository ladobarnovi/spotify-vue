import { apiCall } from "@/api/utils";
import { Album, ItemType, Playlist, Track } from "@/models";

export default {
  recentlyPlayed: () =>
    apiCall<RecentlyPlayedResponse>({
      url: "/me/player/recently-played",
      method: "GET"
    }),

  play: (deviceId: string, data: object) =>
    apiCall({
      url: `/me/player/play?device_id=${deviceId}`,
      method: "PUT",
      data
    }),

  currentPlaying: () =>
    apiCall<CurrentPlayingResponse>({
      url: "/me/player/currently-playing?market=US",
      method: "GET"
    }),

  shuffle: (params: { device_id: string; state: boolean }) =>
    apiCall({
      url: "/me/player/shuffle",
      method: "PUT",
      params
    }),

  get: () =>
    apiCall({
      url: "/me/player",
      method: "GET"
    }),

  repeat: (params: { device_id: string; state: string }) =>
    apiCall({
      url: "/me/player/repeat",
      method: "PUT",
      params
    }),

  devices: () =>
    apiCall<DevicesResponse>({
      url: "/me/player/devices",
      method: "GET"
    }),

  put: (device_ids: string[]) =>
    apiCall({
      url: "/me/player",
      method: "PUT",
      data: {
        device_ids
      }
    })
};

interface RecentlyPlayedResponse {
  items: {
    played_at: Date;
    track: Track;
  }[];
}

interface CurrentPlayingResponse {
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  context: {
    href: string;
    type: ItemType;
    uri: string;
  };
  currently_playing_type: ItemType;
  is_playing: boolean;
  item: Album | Playlist | Track;
  progress_ms: number;
}

interface DevicesResponse {
  devices: {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
  }[]
};
