<template>
  <div id="search-index">
    <CardsRow
      v-if="artists"
      class="artists"
      title="Artists"
      :to="`/search/${ keyword }/artists`"
      :single-line="true"
      :data="artists"
    />
    <CardsRow
      v-if="albums"
      class="albums"
      title="Albums"
      :to="`/search/${ keyword }/albums`"
      :single-line="true"
      :data="albums"
    />
    <CardsRow
      v-if="playlists"
      class="playlists"
      title="Playlists"
      :to="`/search/${ keyword }/playlists`"
      :single-line="true"
      :data="playlists"
    />
    <CardsRow
      v-if="shows"
      class="shows"
      title="Shows"
      :to="`/search/${ keyword }/shows`"
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
    const { searchData, keyword } = useSearch();

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
