import { apiCall } from "@/api/utils";
import { Album, Artist, Track } from "@/models";

export default {
  get: (id: string) =>
    apiCall<Artist>({
      url: `/artists/${id}`,
      method: "get"
    }),

  albums: (id: string) =>
    apiCall<ArtistAlbumsResponse>({
      url: `/artists/${id}/albums?limit=50&market=US`,
      method: "get"
    }),

  relatedArtist: (id: string) =>
    apiCall<RelatedArtistsResponse>({
      url: `/artists/${id}/related-artists`,
      method: "get"
    }),

  topTracks: (id: string) =>
    apiCall<ArtistTopTracksResponse>({
      url: `/artists/${id}/top-tracks`,
      method: "get",
      params: {
        market: "US"
      }
    })
};

interface ArtistAlbumsResponse {
  items: Album[];
}

interface ArtistTopTracksResponse {
  tracks: Track[];
}

interface RelatedArtistsResponse {
  artists: Artist[];
}
