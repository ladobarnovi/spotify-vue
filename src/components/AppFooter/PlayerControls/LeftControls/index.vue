<template>
  <div class="left-controls">
    <p>{{ trackAlbum.name }}</p>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {usePlayerTrackData} from "@/hooks/player";

export default defineComponent({
  setup() {
    const { trackAlbum, trackArtists } = usePlayerTrackData();

    const albumId = computed<string>(() => trackAlbum.value.uri.split(":")[2]);


    return {
      trackAlbum
    };
  }
})
</script>

<style scoped lang="scss">

</style>
