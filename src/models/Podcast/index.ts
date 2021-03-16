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
