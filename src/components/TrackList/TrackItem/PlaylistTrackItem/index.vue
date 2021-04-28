<template>
  <div class="track-item" :class="{ playing: isPlaying && isCurrentTrack, paused: isPaused && isCurrentTrack }">
    <TrackItemStatus
      @play="play"
      :is-playing="isPlaying"
      :is-current-track="isCurrentTrack"
    />
    <TrackItemTitle
      :image="data.track?.album?.images[2]?.url"
      :name="data.track.name"
      :artists="data.track.artists"
      :explicit="data.track.explicit"
    />
    <TrackItemAlbum v-if="data.track.album" :album="data.track.album" />
    <TrackItemDate v-if="data.added_at" :date="data.added_at" />
    <TrackItemDuration :track="data.track" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { PlaylistTrackItem } from "@/models";
import TrackItemStatus from "../TrackItemStatus.vue";
import TrackItemTitle from "../TrackItemTitle.vue";
import TrackItemAlbum from "../TrackItemAlbum.vue";
import TrackItemDate from "../TrackItemDate.vue";
import TrackItemDuration from "../TrackItemDuration.vue";
import { usePlayer } from "@/hooks/player";

export default defineComponent({
  components: {
    TrackItemStatus,
    TrackItemTitle,
    TrackItemAlbum,
    TrackItemDate,
    TrackItemDuration
  },
  props: {
    data: {
      type: Object as () => PlaylistTrackItem,
      required: true
    }
  },
  setup(props, ctx) {
    const { currentTrackId, isPlaying, isPaused, togglePlay } = usePlayer();

    const isCurrentTrack = computed(
      () => currentTrackId.value === props.data.track.id
    );

    function play() {
      if (isCurrentTrack.value && (isPaused.value || isPlaying.value)) {
        togglePlay();
      } else {
        ctx.emit("play");
      }
    }

    return {
      isCurrentTrack,
      isPlaying,
      isPaused,
      play
    };
  }
});
</script>

<style scoped lang="scss">
.track-item {
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
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

  &.album {
    grid-template-columns: [index] 16px [first] 4fr [last] minmax(120px, 1fr);

    .track-album,
    .track-date {
      display: none;
    }
  }
}
</style>
