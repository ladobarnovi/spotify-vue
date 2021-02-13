import {Copyrights, Image, ItemType} from "@/models/Common";
import {Track} from "@/models/Track";
import {Artist} from "@/models/Artist";


export interface Album {
  album_type: string,
  artists: Artist[],
  copyrights: Copyrights[],
  external_ids: {
    [key: string]: string
  },
  external_urls: {
    [key: string]: string
  },
  genres: string[],
  href: string,
  id: string,
  images: Image[],
  label: string,
  name: string,
  popularity: string,
  release_date: Date
  release_date_precision: string,
  total_tracks: string,
  tracks: {
    href: string,
    items: Track[],
    limit: number,
    next: any,
    offset: number,
    previous: any,
    total: number
  }
  type: ItemType,
  uri: string
}
