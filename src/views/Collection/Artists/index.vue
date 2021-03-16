<template>
  <div id="collection-artists">
    <CardsRow title="Artists" :data="artists" :single-line="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { API } from "@/api";
import { Artist } from "@/models";
import CardsRow from "@/components/Cards/CardsRow.vue";

export default defineComponent({
  components: { CardsRow },
  async setup() {
    const artists = ref<Artist[]>();

    const {
      artists: { items }
    } = await API.me.followingGet({ type: "artist" });

    artists.value = items;

    return {
      artists
    };
  }
});
</script>

<style scoped lang="scss"></style>
