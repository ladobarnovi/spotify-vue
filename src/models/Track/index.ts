import {Artist} from "@/models/Artist";
import {ItemType} from "@/models/Common";
import {Album} from "@/models";

export interface Track {
  album: Album,
  artists: Artist[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  episode: boolean,
  explicit: boolean,
  external_ids: {
    [key: string]: string
  }
  external_urls: {
    [key: string]: string
  }
  href: string;
  id: string;
  is_local: false
  name: string;
  popularity: number
  preview_url: string;
  track: boolean
  track_number: number
  type: ItemType
  uri: string;
}
