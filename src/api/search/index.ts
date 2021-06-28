import { apiCall } from "@/api/utils";
import {Album, Artist, Podcast, Track} from "@/models";

export default (params: SearchRequest) =>
  apiCall<SearchResponse>({
    url: "/search",
    method: "get",
    params
  });

interface SearchRequest {
  q: string;
  type: string;
}

export interface SearchResponse {
  albums: {
    items: Album[];
  };
  tracks: {
    items: Track[];
  };
  artist: {
    items: Artist[];
  };
  shows: {
    items: Podcast[]
  };
}
