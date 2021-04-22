import { apiCall } from "@/api/utils";
import { Track } from "@/models";

export default {
  recentlyPlayed: () =>
    apiCall<RecentlyPlayedResponse>({
      url: "/me/player/recently-played",
      method: "GET"
    }),

  play: (deviceId: string) =>
    apiCall({
      url: `/me/player/play?device_id=${deviceId}`,
      method: "PUT",
      data: {
        position_ms: 0,
        offset: {
          position: 0
        },
        context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"
      }
    })
};

interface RecentlyPlayedResponse {
  items: {
    played_at: Date;
    track: Track;
  }[];
}
