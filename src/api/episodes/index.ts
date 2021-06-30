import { apiCall } from "@/api/utils";
import { Episode } from "@/models";

export default {
  get: (id: string) =>
    apiCall<Episode>({
      url: `/episodes/${id}`,
      method: "get"
    })
};
