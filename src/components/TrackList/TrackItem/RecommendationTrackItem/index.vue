<template>
  <div class="track-item">
    <TrackItemTitle
      :image="data.track.album.images[2].url"
      :name="data.track.name"
      :artists="data.track.artists"
    />
    <TrackItemAlbum :album="data.track.album" />
    <TrackItemAdd :id="data.track.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlaylistTrackItem } from "@/models";
import TrackItemTitle from "../TrackItemTitle.vue";
import TrackItemAlbum from "../TrackItemAlbum.vue";
import TrackItemAdd from "../TrackItemAdd.vue";

export default defineComponent({
  components: {
    TrackItemTitle,
    TrackItemAlbum,
    TrackItemAdd
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
  grid-template-columns: [first] 4fr [var1] 2fr [last] minmax(120px, 1fr);
  grid-column-gap: 16px;
  padding: 0 16px;
  height: 56px;
  border-radius: 4px;
  align-items: center;

  .track-title {
    margin-left: -8px;
  }
}
</style>
