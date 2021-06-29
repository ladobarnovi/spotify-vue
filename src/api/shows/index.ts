import { apiCall } from "@/api/utils";
import { Episode, Podcast } from "@/models";

export default {
  index: (id: string) =>
    apiCall<Podcast>({
      url: `/shows/${id}`,
      method: "get"
    }),

  episodes: (id: string) =>
    apiCall<EpisodesResponse>({
      url: `/shows/${id}/episodes`,
      method: "get"
    })
};

interface EpisodesResponse {
  href: string;
  items: Episode[];
}
