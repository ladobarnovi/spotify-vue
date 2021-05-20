import { ref } from "vue";
import { PlaylistTrackItem } from "@/models";
import { API } from "@/api";

const likedSongs = ref<PlaylistTrackItem[]>();

async function fetchLikedSongs() {
  const { items } = await API.me.tracksGet();

  likedSongs.value = items;
}

async function toggleLikeSong(id: string, isLiked: boolean) {
  if (isLiked) {
    await API.me.tracksDelete({ ids: id });
  } else {
    await API.me.tracksPut({ ids: id });
  }

  await fetchLikedSongs();
}

export const useLibrary = () => {
  return {
    likedSongs,
    fetchLikedSongs,
    toggleLikeSong
  };
};
