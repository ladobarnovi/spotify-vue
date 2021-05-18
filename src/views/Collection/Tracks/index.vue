<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLibrary } from "@/hooks/library";

export default defineComponent({
  async setup() {
    const { fetchLikedSongs, likedSongs } = useLibrary();

    await fetchLikedSongs();

    return {
      likedSongs
    };
  }
});
</script>

<style scoped lang="scss"></style>
