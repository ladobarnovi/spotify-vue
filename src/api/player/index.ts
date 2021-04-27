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