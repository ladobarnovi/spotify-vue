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
      <div class="playlist-actions">
        <div class="play">
          <img src="@/assets/icons/play.svg" />
        </div>
      </div>

      <div class="track-list">
        <div class="main-list">
          <TrackListTitles class="album" />

          <div class="main-list-body">
            <PlaylistTrackItem
              v-for="(track, index) in album.tracks.items"
              class="album"
              :data="{ track }"
              :key="index"
            />
          </div>
        </div>
      </div>
      <div class="copyrights">
        <p v-for="(copy, index) in album.copyrights" :key="index">
          <span v-if="copy.type === 'p'">℗</span>
          <span v-else>©</span>
          {{ copy.text }}
        </p>
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

export default defineComponent({
  components: {
    TrackListHeader,
    TrackListTitles,
    PlaylistTrackItem
  },
  async setup() {
    const { currentRoute } = useRouter();
    const album = ref<Album>();

    const albumResponse = await API.albums.get({
      id: currentRoute.value.params.albumId as string
    });

    album.value = albumResponse;

    return {
      album
    };
  }
});
</script>

<style scoped lang="scss">
main {
  position: relative;
  z-index: 2;
  padding: 0 32px;

  .playlist-actions {
    padding: 24px 0;

    .play {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin-right: 32px;
      background-color: var(--green);

      img {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
      }
    }
  }

  .copyrights {
    padding-top: 32px;
    margin-bottom: 48px;

    p {
      color: #b3b3b3;
      font-size: 11px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: normal;
    }
  }
}
</style>
