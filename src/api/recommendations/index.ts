import {apiCall} from "@/api/utils";
import {Track} from "@/models";

export default {
  get: (params: GetRecommendationsRequest) =>
    apiCall<GetRecoomendationsResponse>({
      url: "/recommendations",
      method: "get",
      params
    })
}

interface GetRecommendationsRequest {
  limit: number,
  seed_artists: string,
  seed_genres: string,
  seed_tracks: string
}

interface GetRecoomendationsResponse {
  tracks: Track[]
}
