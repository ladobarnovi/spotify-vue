import { apiCall } from "@/api/utils";
import {Album} from "@/models";

export default {
  get: (payload: GetAlbumRequest) =>
    apiCall<Album>({
      url: `/albums/${ payload.id }`,
      method: "get"
    }),

  tracks: (payload: GetAlbumTracksRequest) =>
    apiCall({
      url: `/albums/${ payload.id }/tracks`,
      method: "get"
    })
}



interface GetAlbumRequest {
  id: string | string[],
  market?: string
}

interface GetAlbumTracksRequest {
  id: string | string[],
  market?: string,
  limit?: number,
  offset?: number,
}
