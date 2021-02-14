<template>
  <div>
    <ArtistHeader
      :image="artist.images[1].url"
      :name="artist.name"
      :listeners="artist.followers.total"
    />
    <main>
      <ArtistActions />
      <ArtistPopularTracks :tracks="topTracks" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Artist, Track } from "@/models";
import ArtistHeader from "@/views/Artist/_artistId/index/components/ArtistHeader.vue";
import ArtistActions from "@/views/Artist/_artistId/index/components/ArtistActions.vue";
import ArtistPopularTracks from "@/views/Artist/_artistId/index/components/ArtistPopularTracks.vue";
import {API} from "@/api";
import {useRouter} from "vue-router";

export default defineComponent({
  components: {
    ArtistHeader,
    ArtistActions,
    ArtistPopularTracks
  },
  async setup() {
    const artist = ref<Artist>();
    const topTracks = ref<Track[]>();
    const { currentRoute } = useRouter();

    const artistId = currentRoute.value.params.artistId as string;

    artist.value = await API.artist.get(artistId);
    topTracks.value = (await API.artist.topTracks(artistId)).tracks;

    return {
      artist,
      topTracks
    };
  }
});
</script>

<style scoped lang="scss">
main {
  position: relative;
  z-index: 2;
  padding: 0 32px 32px;
}
</style>
