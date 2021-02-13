import {apiCall} from "@/api/utils";
import { Playlist } from "@/models";

export default {
  playlists: (params?: MyPlaylistRequest) =>
    apiCall<MyPlaylistsResponse>({
      url: "/me/playlists",
      method: "get",
      params
    })
}

interface MyPlaylistRequest {
  limit?: number,
  offset?: number,
}

interface MyPlaylistsResponse {
  href: string,
  items: Playlist[],
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number
}
