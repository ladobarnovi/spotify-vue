<template>
  <div>
    <CardsRow :title="category" :data="data" :single-line="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearch } from "@/hooks/search";
import CardsRow from "@/components/Cards/CardsRow.vue";

export default defineComponent({
  components: { CardsRow },
  setup() {
    const allowedParams = [
      "artists",
      "albums",
      "playlists",
      "shows",
      "episodes"
    ];

    const data = ref<any>(null);
    const { push } = useRouter();
    const { params } = useRoute();
    const { searchData } = useSearch();

    if (!allowedParams.includes(params.category as string)) {
      push("/search");
    }
    
    data.value = searchData[params.category as string];

    if (!data.value) {
      push("/search");
    }

    return {
      data,
      category: params.category
    };
  }
});
</script>

<style scoped lang="scss"></style>
