import { Copyrights, Image, ItemType } from "@/models";

export interface Podcast {
  available_markets: string[];
  copyrights: Copyrights[];
  description: string;
  explicit: boolean;
  external_urls: {
    [key: string]: string;
  };
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: false;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: ItemType;
  uri: string;
}

export interface Episode {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    [key: string]: string;
  };
  href: string;
  html_description: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  type: ItemType;
  uri: string;
}