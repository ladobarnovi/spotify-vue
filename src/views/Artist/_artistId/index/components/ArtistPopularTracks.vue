<template>
  <div class="popular-tracks">
    <p class="title">Popular</p>

    <TopTrackItem
      v-for="(track, index) in tracks"
      :key="index"
      :data="{ track }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Track } from "@/models/Track";
import TopTrackItem from "@/components/TrackList/TrackItem/TopTrackItem/index.vue";

export default defineComponent({
  components: {
    TopTrackItem
  },
  props: {
    tracks: {
      type: Array as () => Track[],
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.popular-tracks {
  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -.04em;
    margin: 20px 0;
  }
}
</style>
