<template>
  <div class="track-item">
    <TrackItemStatus />
    <TrackItemTitle :track="data.track" />
    <TrackItemAlbum :album="data.track.album" />
    <TrackItemDate :date="data.added_at" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {PlaylistTrackItem} from "@/models";
import TrackItemStatus from "./TrackItemStatus.vue";
import TrackItemTitle from "./TrackItemTitle.vue";
import TrackItemAlbum from "./TrackItemAlbum.vue";
import TrackItemDate from "./TrackItemDate.vue";

export default defineComponent({
  components: {
    TrackItemStatus,
    TrackItemTitle,
    TrackItemAlbum,
    TrackItemDate
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
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
      120px,
      1fr
    );
  grid-column-gap: 16px;
  padding: 0 16px;
  height: 60px;
  border-radius: 4px;
  align-items: center;
}
</style>
