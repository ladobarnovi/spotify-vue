<template>
  <div class="search-keyword">
    <CardsRow
      v-if="artists"
      class="artists"
      title="Artists"
      :to="`/search/${keyword}/artists`"
      :single-line="true"
      :data="artists"
    />
    <CardsRow
      v-if="albums"
      class="albums"
      title="Albums"
      :to="`/search/${keyword}/albums`"
      :single-line="true"
      :data="albums"
    />
    <CardsRow
      v-if="playlists"
      class="playlists"
      title="Playlists"
      :to="`/search/${keyword}/playlists`"
      :single-line="true"
      :data="playlists"
    />
    <CardsRow
      v-if="shows"
      class="shows"
      title="Shows"
      :to="`/search/${keyword}/shows`"
      :single-line="true"
      :data="shows"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { useSearch } from "@/hooks/search";
import CardsRow from "@/components/Cards/CardsRow";

export default defineComponent({
  components: { CardsRow },
  setup() {
    const { searchData, keyword } = useSearch();

    return {
      ...toRefs(searchData),
      keyword
    };
  }
});
</script>

<style scoped lang="scss">
.search-keyword {
  .cards-row {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}
</style>
