<template>
  <div id="tracks">
    <TrackListHeader
      name="Liked Songs"
      type="playlist"
      :tracks="likedSongs"
      image="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
      :owner="me"
    />

    <main>
      <ContextTogglePlay
        v-if="likedSongs.length > 0"
        :context-uri="uri"
        context-name="Liked Songs"
        :fixed="fixed"
      />

      <div class="main-list">
        <TrackListTitles @fixed="fixed = $event" />

        <PlaylistTrackItem
          v-for="(item, index) in likedSongs"
          :key="index"
          :data="item"
          @play="playPlaylist(uri, index, item.track.uri)"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useLibrary } from "@/hooks/library";
import { me } from "@/hooks/auth";
import TrackListTitles from "@/components/TrackList/TrackListTitles/index.vue";
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import PlaylistTrackItem from "@/components/TrackList/TrackItem/PlaylistTrackItem/index.vue";
import ContextTogglePlay from "@/components/TrackList/ContextTogglePlay.vue";
import { usePlayer } from "@/hooks/player";

export default defineComponent({
  components: {
    TrackListHeader,
    TrackListTitles,
    PlaylistTrackItem,
    ContextTogglePlay
  },
  async setup() {
    const fixed = ref(false);

    const uri = computed(() => `${me.value.uri}:collection`);

    const { playPlaylist } = usePlayer();
    const { fetchLikedSongs, likedSongs } = useLibrary();

    await fetchLikedSongs();

    return {
      likedSongs,
      me,
      uri,
      fixed,
      playPlaylist
    };
  }
});
</script>

<style scoped lang="scss">
#tracks {
  main {
    position: relative;
    z-index: 2;
    padding: 0 32px 24px;
  }
}
</style>
