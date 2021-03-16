<template>
  <div id="collection-albums">
    <CardsRow title="Albums" :data="albums" :single-line="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Artist } from "@/models";
import { API } from "@/api";
import CardsRow from "@/components/Cards/CardsRow.vue";

export default defineComponent({
  components: {CardsRow},
  async setup() {
    const albums = ref<any>();

    const { items } = await API.me.albumsGet();

    albums.value = items?.map(i => i?.album);

    return {
      albums
    };
  }
});
</script>

<style scoped lang="scss"></style>
