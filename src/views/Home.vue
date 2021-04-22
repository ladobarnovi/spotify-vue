<template>
  <div id="home">
    <CardsRow title="Spotify Playlists" :data="playlists" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { API } from "@/api";
import CardsRow from "@/components/Cards/CardsRow.vue";
import { Playlist } from "@/models";

export default defineComponent({
  name: "Home",
  components: { CardsRow },
  async setup() {
    const playlists = ref<Playlist[]>();

    playlists.value = (await API.browse.featuredPlaylists()).playlists.items;

    return {
      playlists
    };
  }
});
</script>

<style lang="scss" scoped>
#home {
  padding: 76px 32px 32px;
}
</style>
