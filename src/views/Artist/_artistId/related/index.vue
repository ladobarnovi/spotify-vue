<template>
  <div id="related">
    <main>
      <CardsRow title="Fans Also Like" :data="related" :single-line="false" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Artist } from "@/models";
import CardsRow from "@/components/Cards/CardsRow.vue";
import {useRouter} from "vue-router";
import {API} from "@/api";

export default defineComponent({
  components: {
    CardsRow
  },
  async setup() {
    const related = ref<Artist[]>();
    const { currentRoute } = useRouter();
    const artistId = currentRoute.value.params.artistId as string;

    related.value = (await API.artist.relatedArtist(artistId)).artists;

    return {
      related
    };
  }
});
</script>

<style scoped lang="scss">
#related {
  padding-top: 60px;

  main {
    padding: 16px 32px 32px;
  }
}
</style>
