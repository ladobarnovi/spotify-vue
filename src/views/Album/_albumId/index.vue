<template>
  <div>
    <TrackListHeader
      :name="album.name"
      :type="album.type"
      :tracks="album.tracks.items"
      :image="album.images[0].url"
      :artists="album.artists"
    />

    <main>
      <ContextTogglePlay
        :context-uri="album.uri"
        :context-name="album.name"
        :fixed="fixed"
      />

      <div class="track-list">
        <div class="main-list">
          <TrackListTitles class="album" @fixed="fixed = $event" />

          <div class="main-list-body">
            <PlaylistTrackItem
              v-for="(track, index) in album.tracks.items"
              class="album"
              :data="{ track }"
              :key="index"
              @play="playPlaylist(album.uri, index)"
            />
          </div>
        </div>
      </div>
      <div class="copyrights">
        <p v-for="(copy, index) in album.copyrights" :key="index">
          {{ copy.text }}
        </p>
      </div>

      <div class="more">
        <CardsRow
          :data="moreAlbums"
          :title="`More by ${album.artists[0].name}`"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Album } from "@/models";
import { API } from "@/api";
import { useRouter } from "vue-router";
import PlaylistTrackItem from "@/components/TrackList/TrackItem/PlaylistTrackItem/index.vue";
import TrackListTitles from "@/components/TrackList/TrackListTitles/index.vue";
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import CardsRow from "@/components/Cards/CardsRow.vue";
import { usePlayer, usePlayerStatus, usePlayerTrackData } from "@/hooks/player";
import ContextTogglePlay from "@/components/TrackList/ContextTogglePlay.vue";

export default defineComponent({
  components: {
    ContextTogglePlay,
    TrackListHeader,
    TrackListTitles,
    PlaylistTrackItem,
    CardsRow
  },
  async setup() {
    const album = ref<Album>();
    const moreAlbums = ref<Album[]>();
    const fixed = ref(false);
    const { currentRoute } = useRouter();
    const { playPlaylist } = usePlayer();

    album.value = await API.albums.get({
      id: currentRoute.value.params.albumId as string
    });
    moreAlbums.value = (
      await API.artist.albums(album.value.artists[0].id)
    ).items;

    return {
      album,
      moreAlbums,
      playPlaylist,
      fixed
    };
  }
});
</script>

<style scoped lang="scss">
main {
  position: relative;
  z-index: 2;
  padding: 0 32px 32px;

  .copyrights {
    padding-top: 32px;
    padding-bottom: 48px;

    p {
      color: #b3b3b3;
      font-size: 11px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: normal;
    }
  }

  .more {
    .title {
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: -0.04em;
    }
  }
}
</style>
