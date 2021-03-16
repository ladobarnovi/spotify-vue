<template>
  <div id="collection-podcasts">
    <CardsRow
      title="Podcasts"
      :data="shows"
      :single-line="false"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {API} from "@/api";
import { Podcast } from "@/models";
import CardsRow from "@/components/Cards/CardsRow.vue";

export default defineComponent({
  components: {CardsRow},
  async setup() {
    const shows = ref<Podcast[]>();

    shows.value = (await API.me.showsGet()).items.map(i => i.show);

    return {
      shows
    };
  }
});
</script>

<style scoped lang="scss"></style>
