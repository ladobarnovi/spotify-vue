import {apiCall} from "@/api/utils";
import {Album, Artist, Track} from "@/models";

export default {
  get: (id: string) =>
    apiCall<Artist>({
      url: `/artists/${ id }`,
      method: "get"
    }),

  albums: (id: string) =>
    apiCall<ArtistAlbumsResponse>({
      url: `/artists/${ id }/albums`,
      method: "get"
    }),

  relatedArtist: (id: string) =>
    apiCall<Artist[]>({
      url: `/artists/${ id }/related-artists`,
      method: "get"
    }),

  topTracks: (id: string) =>
    apiCall<Track[]>({
      url: `/artists/${ id }/top-tracks`,
      method: "get"
    })
}

interface ArtistAlbumsResponse {
  items: Album[]
}
