import { ref } from "vue";
import { Track } from "@/models";
import { API } from "@/api";

const likedSongs = ref<Track[]>();

async function fetchLikedSongs() {
  console.log("Fetching Songs");
  const { items } = await API.me.tracksGet();


  console.log(items.map(i => i.track));
  likedSongs.value = items.map(i => i.track);
}

async function toggleLikeSong(id: string, isLiked: boolean) {
  if (isLiked) {
    await API.me.tracksDelete({ ids: id });
  } else {
    await API.me.tracksPut({ ids: id });
  }
}

export const useLibrary = () => {
  return {
    likedSongs,
    fetchLikedSongs,
    toggleLikeSong
  };
};
