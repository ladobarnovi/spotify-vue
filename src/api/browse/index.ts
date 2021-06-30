import { apiCall } from "@/api/utils";
import { Playlist } from "@/models";

export default {
  newReleases: (params?: any) =>
    apiCall({
      url: "/browse/new-releases",
      method: "get",
      params
    }),

  featuredPlaylists: (params?: any) =>
    apiCall<FeaturedPlaylistsResponse>({
      url: "/browse/featured-playlists",
      method: "get",
      params
    })
};

interface FeaturedPlaylistsResponse {
  playlists: {
    items: Playlist[];
  };
}
