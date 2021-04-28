<template>
  <div class="middle-controls">
    <PlaybackBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlaybackBar from "./PlaybackBar.vue";

export default defineComponent({
  components: {PlaybackBar},
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.middle-controls {
  width: 40%;
  max-width: 720px;
}
</style>
