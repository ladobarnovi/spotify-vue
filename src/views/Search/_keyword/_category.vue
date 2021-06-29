<template>
  <div>
    <CardsRow
      :title="category"
      :data="data"
      :single-line="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearch } from "@/hooks/search";
import CardsRow from "@/components/Cards/CardsRow";

export default defineComponent({
  components: {CardsRow},
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

    if (!allowedParams.includes(params.category)) {
      push("/search");
    }

    data.value = searchData[params.category];

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
