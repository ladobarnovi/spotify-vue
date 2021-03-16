import { Image, ItemType, OwnerType, Track } from "@/models";

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    [key: string]: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: PlaylistTrackItem[];
    limit: number;
    total: number;
  };
  type: ItemType;
  uri: string;
}

export interface PlaylistTrackItem {
  added_at: Date;
  added_by: {
    external_urls: {
      [key: string]: string;
    };
    spotify: string;
    href: string;
    id: string;
    type: OwnerType;
    uri: string;
  };
  is_local: boolean;
  primary_color: string;
  track: Track;
  video_thumbnail: {
    url: string;
  };
}

export interface PlaylistOwner {
  display_name: string;
  external_urls: {
    [key: string]: string;
  };
  href: string;
  id: string;
  type: OwnerType;
  uri: string;
}
