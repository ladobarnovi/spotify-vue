<template>
  <div class="middle-controls">
    <PlaybackControls />
    <PlaybackBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlaybackBar from "./PlaybackBar.vue";
import PlaybackControls from "./PlaybackControls.vue";

export default defineComponent({
  components: { PlaybackBar, PlaybackControls },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.middle-controls {
  flex-shrink: 0;
  width: 40%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
