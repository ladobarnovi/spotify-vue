<template>
  <div class="track-item" :class="{ playing: isPlaying && isCurrentTrack, paused: isPaused && isCurrentTrack }">
    <TrackItemStatus
      @play="play"
    />
    <TrackItemTitle
      :image="data.track.album.images[2].url"
      :name="data.track.name"
    />
    <TrackItemListens />
    <TrackItemDuration :track="data.track" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { PlaylistTrackItem } from "@/models";
import TrackItemStatus from "../TrackItemStatus.vue";
import TrackItemTitle from "../TrackItemTitle.vue";
import TrackItemDuration from "../TrackItemDuration.vue";
import TrackItemListens from "../TrackItemListens.vue";
import { usePlayerStatus, usePlayerTrackData } from "@/hooks/player";

export default defineComponent({
  components: {
    TrackItemStatus,
    TrackItemTitle,
    TrackItemDuration,
    TrackItemListens
  },
  props: {
    data: {
      type: Object as () => PlaylistTrackItem,
      required: true
    }
  },
  setup(props, ctx) {
    const { isPlaying, isPaused } = usePlayerStatus();
    const { trackId } = usePlayerTrackData();

    const isCurrentTrack = computed(
      () => trackId.value === props.data.track.id
    );

    function play() {
      if (isCurrentTrack.value && (isPaused.value || isPlaying.value)) {
        ctx.emit("toggle");
      } else {
        ctx.emit("play");
      }
    }

    return {
      isPlaying,
      isCurrentTrack,
      isPaused,
      play
    };
  }
});
</script>

<style scoped lang="scss">
.track-item {
  display: grid;
  grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(
      120px,
      1fr
    );
  grid-column-gap: 16px;
  padding: 0 16px;
  height: 56px;
  border-radius: 4px;
  align-items: center;

  --color: #b3b3b3;
  color: var(--color);

  &:hover,
  &.active,
  &:active {
    color: white;
  }
}
</style>
