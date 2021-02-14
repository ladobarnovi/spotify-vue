import {apiCall} from "@/api/utils";
import {Image, ItemType, OwnerType, Playlist} from "@/models";

export default {
  get: () =>
    apiCall<UserProfile>({
      url: "/me",
      method: "get"
    }),

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

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  }
  external_urls: {
    [key: string]: string
  }
  followers: {
    href: string,
    total: number
  }

  href: string
  id: string
  images: Image[]

  product: string
  type: OwnerType
  uri: string
}
