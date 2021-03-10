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
      <CardsRow
        class="discography"
        :data="albums"
        :to="discographyPath"
        title="Discography"
      />
      <CardsRow
        class="related"
        :data="related"
        :to="relatedPath"
        title="Fans Also Like"
      />
      <ArtistAbout />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Artist, Track, Album } from "@/models";
import ArtistAbout from "@/views/Artist/_artistId/index/components/ArtistAbout.vue";
import ArtistHeader from "@/views/Artist/_artistId/index/components/ArtistHeader.vue";
import ArtistActions from "@/views/Artist/_artistId/index/components/ArtistActions.vue";
import ArtistPopularTracks from "@/views/Artist/_artistId/index/components/ArtistPopularTracks.vue";
import CardsRow from "@/components/Cards/CardsRow.vue";
import { API } from "@/api";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    ArtistHeader,
    ArtistActions,
    ArtistPopularTracks,
    CardsRow,
    ArtistAbout
  },
  async setup() {
    const artist = ref<Artist>();
    const topTracks = ref<Track[]>();
    const albums = ref<Album[]>();
    const related = ref<Artist[]>();
    const { currentRoute } = useRouter();

    const artistId = currentRoute.value.params.artistId as string;

    artist.value = await API.artist.get(artistId);
    topTracks.value = (await API.artist.topTracks(artistId)).tracks;
    albums.value = (await API.artist.albums(artistId)).items;
    related.value = (await API.artist.relatedArtist(artistId)).artists;

    const discographyPath = `/artist/${artistId}/discography`;
    const relatedPath = `/artist/${artistId}/related`;

    return {
      artist,
      topTracks,
      albums,
      related,
      discographyPath,
      relatedPath
    };
  }
});
</script>

<style scoped lang="scss">
main {
  position: relative;
  z-index: 2;
  padding: 0 32px 32px;

  .popular-tracks,
  .discography,
  .related {
    margin-bottom: 40px;
  }
}
</style>
