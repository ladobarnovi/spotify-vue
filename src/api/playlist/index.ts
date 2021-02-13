import {apiCall} from "@/api/utils";
import {Playlist} from "@/models";

export default {
  get: (id: string, options?: { market?: string, fields?: string }) =>
    apiCall<Playlist>({
      url: `/playlists/${id}`,
      method: "get"
    })
}
