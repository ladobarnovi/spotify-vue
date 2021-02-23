<template>
  <div class="popular-tracks">
    <p class="title">Popular</p>

    <TopTrackItem
      v-for="(track, index) in trackList"
      :key="index"
      :data="{ track }"
    />

    <p v-if="tracks.length > 5" @click="toggle" class="toggle-more">
      <span v-if="more">Show Less</span>
      <span v-else>Show More</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Track } from "@/models/Track";
import TopTrackItem from "@/components/TrackList/TrackItem/TopTrackItem/index.vue";
import { useToggle } from "@/hooks/toggle";

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
  setup(props) {
    const { active: more, toggle } = useToggle();

    const trackList = computed(() => {
      if (more.value) return props.tracks.slice(0, 10);
      else return props.tracks.slice(0, 5);
    });

    return {
      trackList,
      more,
      toggle
    };
  }
});
</script>

<style scoped lang="scss">
.popular-tracks {
  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.04em;
    margin: 20px 0;
  }

  .toggle-more {
    padding: 16px;
    color: hsla(0, 0%, 100%, 0.7);
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: .1em;
    text-transform: uppercase;

    &:hover {
      color: white;
    }
  }
}
</style>
