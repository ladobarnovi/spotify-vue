import {ItemType} from "@/models/Common";

export interface Artist {
  external_urls: {
    [key: string]: string
  },
  href: string,
  id: string,
  name: string,
  type: ItemType,
  uri: string,
}
