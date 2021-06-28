<template>
  <div id="search-index">
    <CardsRow
      v-if="artists"
      class="artists"
      title="Artists"
      to="/search/artists"
      :single-line="true"
      :data="artists"
    />
    <CardsRow
      v-if="albums"
      class="albums"
      title="Albums"
      to="/search/albums"
      :single-line="true"
      :data="albums"
    />
    <CardsRow
      v-if="playlists"
      class="playlists"
      title="Playlists"
      to="/search/playlists"
      :single-line="true"
      :data="playlists"
    />
    <CardsRow
      v-if="shows"
      class="shows"
      title="Shows"
      to="/search/shows"
      :single-line="true"
      :data="shows"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from "vue";
import { useSearch } from "@/hooks/search";
import { API } from "@/api";
import CardsRow from "@/components/Cards/CardsRow.vue";

export default defineComponent({
  components: { CardsRow },
  setup() {
    let timeoutId: number = null;

    const { keyword, setSearchData, searchData } = useSearch();

    watch(keyword, () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        const res = await API.search({
          q: keyword.value,
          type: "album,track,artist,show,playlist"
        });

        setSearchData(res);
      }, 100);
    });

    return {
      keyword,
      ...toRefs(searchData)
    };
  }
});
</script>

<style lang="scss" scoped>
#search-index {
  padding: 60px 32px 32px;

  .cards-row {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}
</style>
