import { apiCall } from "@/api/utils";

export default (params: SearchRequest) =>
  apiCall({
    url: "/search",
    method: "post",
    params
  });

interface SearchRequest {
  q: string;
  type: string;
}
