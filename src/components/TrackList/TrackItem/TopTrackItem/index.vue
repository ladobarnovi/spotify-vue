<template>
  <div class="track-item">
    <TrackItemStatus />
    <TrackItemTitle
      :image="data.track.album.images[2].url"
      :name="data.track.name"
    />
    <TrackItemListens />
    <TrackItemDuration :track="data.track" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlaylistTrackItem } from "@/models";
import TrackItemStatus from "../TrackItemStatus.vue";
import TrackItemTitle from "../TrackItemTitle.vue";
import TrackItemDuration from "../TrackItemDuration.vue";
import TrackItemListens from "../TrackItemListens.vue";

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
  setup() {
    return {};
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
