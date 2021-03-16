export interface Copyrights {
  text: string;
  type: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export type ItemType = "track" | "album" | "artist" | "playlist" | "show";

export type OwnerType = "user" | "admin";
