<template>
  <div id="discography">
    <main>
      <CardsRow
        class="albums"
        title="Albums"
        :data="albums"
        :single-line="false"
      />
      <CardsRow
        class="singles"
        title="Singles & EPs"
        :data="singles"
        :single-line="false"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Album } from "@/models";
import CardsRow from "@/components/Cards/CardsRow.vue";
import { API } from "@/api";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { CardsRow },
  async setup() {
    const allAlbums = ref<Album[]>();
    const { currentRoute } = useRouter();

    const artistId = currentRoute.value.params.artistId as string;

    allAlbums.value = (await API.artist.albums(artistId)).items;

    const albums = computed(() =>
      allAlbums.value?.filter(a => a.album_type === "album")
    );
    const singles = computed(() =>
      allAlbums.value?.filter(a => a.album_type === "single")
    );

    return {
      albums,
      singles
    };
  }
});
</script>

<style scoped lang="scss">
#discography {
  padding-top: 60px;

  main {
    padding: 16px 32px 32px;

    .albums + .singles {
      margin-top: 32px;
    }
  }
}
</style>
