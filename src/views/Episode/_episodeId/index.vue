<template>
  <div id="episode-id">
    <TrackListHeader
      :name="episode.name"
      publisher="Host Name Not Available"
      :type="episode.type"
      :image="episode.images[0].url"
    />
    <main></main>
  </div>
</template>

<script lang="ts">
import TrackListHeader from "@/components/TrackList/TrackListHeader/index.vue";
import { defineComponent, ref } from "vue";
import { Episode } from "@/models";
import { useRoute } from "vue-router";
import { API } from "@/api";

export default defineComponent({
  components: {
    TrackListHeader
  },
  async setup() {
    const episode = ref<Episode>();
    const { params } = useRoute();

    episode.value = await API.episodes.get(params.episodeId as string);

    return {
      episode
    };
  }
});
</script>

<style scoped lang="scss"></style>
