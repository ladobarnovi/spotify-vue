import {reactive, ref, toRefs} from "vue";
import { Album, Artist, Playlist, Podcast, Track } from "@/models";
import { SearchResponse } from "@/api/search";

interface SearchData {
  // albums: Album[];
  // tracks: Track[];
  // playlists: Playlist[];
  // artists: Artist[];
  // shows: Podcast[];
  [key: string]: Album[] | Track[] | Playlist[] | Artist[] | Podcast
}

const keyword = ref<string>(null);
const searchData = reactive<SearchData>({
  albums: null,
  playlists: null,
  artists: null,
  shows: null,
  tracks: null
});

function setSearchData(d: SearchResponse): void {
  if (d.albums?.items.length > 0) {
    searchData.albums = d.albums.items;
  }

  for (const key in d) {
    searchData[key as string] = d[key as keyof SearchResponse]
      .items as any;
  }
}

export const useSearch = () => {
  return {
    keyword,
    setSearchData,
    searchData,
    ...toRefs(searchData)
  };
};
